import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
const DA = 'Jeg fortæller gerne mere om, hvordan det fungerer i praksis - både det praktiske og det formelle omkring ordning, tilskud og aftale. Tag endelig fat i mig.'
const EN = 'I am happy to explain how it works in practice - both the practical side and the formal questions about the scheme, the supplement, and the agreement. Feel free to reach out to me.'
async function run() {
  for (const id of ['ordningen', 'drafts.ordningen']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) continue
    const fix = (sections: any[], txt: string) =>
      (sections ?? []).map(s => /jobkonsulent|job consultant/i.test(s.body ?? '') ? { ...s, body: txt } : s)
    await client.patch(id).set({
      sections: fix(doc.sections, DA),
      sectionsEn: fix(doc.sectionsEn, EN),
    }).commit()
    console.log('✓', id)
  }
}
run().catch(e => { console.error(e); process.exit(1) })
