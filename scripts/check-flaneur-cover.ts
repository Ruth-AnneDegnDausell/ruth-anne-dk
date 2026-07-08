import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const id of ['project-flaneur', 'drafts.project-flaneur']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) { console.log(id, ': ingen'); continue }
    console.log(id, '| cover-ref:', doc.cover?.asset?._ref?.slice(0, 30) ?? '(intet)', '| opdateret:', doc._updatedAt)
  }
}
run().catch(e => { console.error(e); process.exit(1) })
