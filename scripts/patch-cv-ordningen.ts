/**
 * 1. cv: flytter DR Lab, Grafik-kursus og Højskole fra 'edu' til nyt 'kurser'-felt,
 *    og erstatter tankestreger i perioder med bindestreg.
 * 2. ordningen: fjerner Moderniseringsstyrelsen-linket (DA + EN) og opdaterer
 *    brødteksten i "Den statslige fleksjobordning".
 *
 * Run: npx sanity exec scripts/patch-cv-ordningen.ts --with-user-token
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  perspective: 'raw',
})

const KURSUS_TITLES = new Set(['DR Lab', 'Grafik-kursus', 'Højskole'])
const noDash = (s: unknown) => (typeof s === 'string' ? s.replace(/\s*[–—]\s*/g, '-') : s)

async function patchCv(id: string) {
  const doc = await client.getDocument(id).catch(() => null)
  if (!doc) return false

  const edu = (doc.edu ?? []) as any[]
  const kurser = edu.filter(e => KURSUS_TITLES.has(e.title))
  const rest = edu.filter(e => !KURSUS_TITLES.has(e.title))

  const exp = ((doc.exp ?? []) as any[]).map(e => ({
    ...e,
    period: noDash(e.period),
    periodEn: noDash(e.periodEn),
  }))

  await client.patch(id).set({
    edu: rest,
    kurser: doc.kurser?.length ? doc.kurser : kurser,
    exp,
  }).commit()
  return true
}

async function patchOrdningen(id: string) {
  const doc = await client.getDocument(id).catch(() => null)
  if (!doc) return false

  const stripLink = (links: any[]) =>
    (links ?? []).filter(l => !(l.href ?? '').includes('moderniseringsstyrelsen'))

  const fixBody = (sections: any[], daBody: string, enBody: string, isEn: boolean) =>
    (sections ?? []).map(s =>
      s.title === 'Den statslige fleksjobordning' || s.title === 'The state flex job scheme'
        ? { ...s, body: isEn ? enBody : daBody }
        : s
    )

  const daBody = 'Statsinstitutioner, ministerier og øvrige statslige arbejdspladser kan ansætte medarbejdere i fleksjob på samme grundvilkår som private og kommunale arbejdsgivere. Ordningen reguleres af et særskilt finansministerielt cirkulære.'
  const enBody = 'State institutions, ministries, and other government workplaces can employ people in flex jobs on the same basic terms as private and municipal employers. The scheme is governed by a specific Finance Ministry circular.'

  await client.patch(id).set({
    links: stripLink(doc.links),
    linksEn: stripLink(doc.linksEn),
    sections: fixBody(doc.sections, daBody, enBody, false),
    sectionsEn: fixBody(doc.sectionsEn, daBody, enBody, true),
  }).commit()
  return true
}

async function run() {
  for (const id of ['cv', 'drafts.cv']) {
    if (await patchCv(id)) console.log(`✓ ${id}: edu/kurser opdelt, tankestreger rettet`)
  }
  for (const id of ['ordningen', 'drafts.ordningen']) {
    if (await patchOrdningen(id)) console.log(`✓ ${id}: Moderniseringsstyrelsen-link fjernet`)
  }
}

run().catch(err => { console.error(err); process.exit(1) })
