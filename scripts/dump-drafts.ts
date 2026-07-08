import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  const rows = await client.fetch(`*[_type=="project" && !(_id in path("drafts.**"))]{
    "slug": slug.current,
    "pubDesc": desc, "pubDescEn": descEn, "pubTitleEn": titleEn,
    "draft": *[_id == "drafts." + ^._id][0]{ "desc": desc, "descEn": descEn, "titleEn": titleEn }
  }`)
  for (const r of rows) {
    const d = r.draft ?? {}
    const flag = (a: unknown, b: unknown) => (a && !b ? ' ⚠ MISTES' : '')
    console.log(r.slug, '| desc: pub=' + !!r.pubDesc + ' draft=' + !!d.desc + flag(r.pubDesc, d.desc), '| titleEn: pub=' + !!r.pubTitleEn + ' draft=' + !!d.titleEn)
  }
}
run().catch(e => { console.error(e); process.exit(1) })
