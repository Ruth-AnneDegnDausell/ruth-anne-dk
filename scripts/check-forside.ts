import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const id of ['forside', 'drafts.forside']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) { console.log(id, ': FINDES IKKE'); continue }
    console.log(id, ':')
    for (const k of ['tagline', 'intro', 'aboutHeading', 'aboutBody1', 'aboutBody2']) {
      console.log(' ', k, '=', doc[k] ? JSON.stringify(String(doc[k]).slice(0, 60)) : '(tom)')
    }
    console.log('  heroImage:', doc.heroImage?.asset ? 'uploadet' : '(tom)')
  }
}
run().catch(e => { console.error(e); process.exit(1) })
