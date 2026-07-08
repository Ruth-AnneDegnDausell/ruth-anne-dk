import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
const URL = 'https://www.borger.dk/arbejde-dagpenge-ferie/Fleksjob-loentilskud-for-foertidspensionister-revalidering/hvem-kan-faa-fleksjob'
async function run() {
  for (const id of ['ordningen', 'drafts.ordningen']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) continue
    const fix = (links: any[]) => (links ?? []).map(l => (l.href ?? '').includes('borger.dk') ? { ...l, href: URL } : l)
    await client.patch(id).set({ links: fix(doc.links), linksEn: fix(doc.linksEn) }).commit()
    console.log('✓', id)
  }
}
run().catch(e => { console.error(e); process.exit(1) })
