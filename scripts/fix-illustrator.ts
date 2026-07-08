import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const id of ['forside', 'drafts.forside']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) continue
    const patch: Record<string, string> = {}
    for (const k of ['tagline', 'intro', 'aboutHeading', 'aboutBody1', 'aboutBody2']) {
      if (typeof doc[k] === 'string' && doc[k].includes('Illustratør')) patch[k] = doc[k].replace(/Illustratør/g, 'Illustrator')
      if (typeof doc[k] === 'string' && doc[k].includes('illustratør')) patch[k] = (patch[k] ?? doc[k]).replace(/illustratør/g, 'illustrator')
    }
    if (Object.keys(patch).length) { await client.patch(id).set(patch).commit(); console.log('✓', id, Object.keys(patch).join(', ')) }
  }
}
run().catch(e => { console.error(e); process.exit(1) })
