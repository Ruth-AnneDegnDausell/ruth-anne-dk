import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const slug of ['velo-magazine', 'suhn-io', 'substrate']) {
    for (const prefix of ['', 'drafts.']) {
      const id = prefix + 'project-' + slug
      const doc = await client.getDocument(id).catch(() => null)
      if (!doc) { console.log(id, ': findes ikke'); continue }
      const gal = (doc.gallery ?? []).map((g: any) => g.path ?? (g.image?.asset?._ref ?? '?'))
      console.log(id, '| gallery:', gal.length, JSON.stringify(gal))
      if (doc.videos) console.log('  videos-felt:', JSON.stringify(doc.videos))
    }
  }
  // Er der overhovedet video-assets i Sanity?
  const files = await client.fetch(`*[_type == "sanity.fileAsset"]{ originalFilename, url, mimeType }`)
  console.log('\nfil-assets i Sanity:', files.length)
  files.forEach((f: any) => console.log(' -', f.originalFilename, '|', f.mimeType))
}
run().catch(e => { console.error(e); process.exit(1) })
