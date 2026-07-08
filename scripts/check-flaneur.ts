import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  const docs = await client.fetch(`*[_id in ["project-flaneur", "drafts.project-flaneur"]]{ _id, title, "slug": slug.current, "hasGallery": count(gallery), "hasCover": defined(cover.asset) }`)
  console.log(JSON.stringify(docs, null, 1))
  const all = await client.fetch(`*[_type == "project" && !(_id in path("drafts.**"))]{ "slug": slug.current } | order(slug asc)`)
  console.log('publicerede slugs:', all.map((d: any) => d.slug).join(', '))
}
run().catch(e => { console.error(e); process.exit(1) })
