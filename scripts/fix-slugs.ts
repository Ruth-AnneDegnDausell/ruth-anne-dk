import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
const FIX: Record<string, string> = {
  'project-flaneur': 'flaneur',
  'project-komunale-losninger': 'podcast-cover',
  'project-videnskab-podcast': 'huslaegens-bord-podcast',
}
async function run() {
  for (const [id, slug] of Object.entries(FIX)) {
    for (const docId of [id, 'drafts.' + id]) {
      const doc = await client.getDocument(docId).catch(() => null)
      if (!doc) continue
      await client.patch(docId).set({ 'slug.current': slug }).commit()
      console.log('✓', docId, '→', slug)
    }
  }
}
run().catch(e => { console.error(e); process.exit(1) })
