import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  const ids = ['forside', 'about-arbejde', 'about-privat', 'kontakt', 'fleksjob', 'cv']
  for (const id of ids) {
    const d = await client.getDocument(id).catch(() => null)
    if (!d) continue
    console.log('━━━', id, '━━━')
    for (const [k, v] of Object.entries(d)) {
      if (k.startsWith('_') || k.endsWith('En') || ['heroImage', 'photo', 'pdfFile'].includes(k)) continue
      if (typeof v === 'string') console.log(`${k}: ${v}`)
      else if (Array.isArray(v)) console.log(`${k}: ${JSON.stringify(v).slice(0, 900)}`)
    }
    console.log()
  }
}
run().catch(e => { console.error(e); process.exit(1) })
