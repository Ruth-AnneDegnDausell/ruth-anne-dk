import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  const paths = await client.fetch(`{
    "gallery": *[_type=="project"].gallery[].path,
    "covers": *[_type=="project"].coverPath,
    "items": *[_type in ["fotografiItem","illustrationItem"]].src
  }`)
  const all = [...(paths.gallery??[]), ...(paths.covers??[]), ...(paths.items??[])].filter(Boolean)
  console.log(JSON.stringify(all))
}
run().catch(e => { console.error(e); process.exit(1) })
