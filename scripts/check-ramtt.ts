import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const id of ['project-ramtt', 'drafts.project-ramtt']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) { console.log(id, ': ingen'); continue }
    console.log('===', id, '===')
    console.log('cover: asset =', doc.cover?.asset?._ref?.slice(6, 20) ?? '(intet)',
      '| crop =', JSON.stringify(doc.cover?.crop ?? null),
      '| hotspot =', doc.cover?.hotspot ? 'sat' : 'nej')
    ;(doc.gallery ?? []).forEach((g: any, i: number) => {
      console.log(`  ${i + 1}. path=${g.path ?? '-'} | asset=${g.image?.asset?._ref?.slice(6, 20) ?? '-'} | aspect=${g.aspect ?? '-'} | rot=${g.rotation ?? 0}`)
    })
  }
}
run().catch(e => { console.error(e); process.exit(1) })
