import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  for (const id of ['cv', 'drafts.cv']) {
    const doc = await client.getDocument(id).catch(() => null)
    if (!doc) continue
    await client.patch(id).set({
      'exp[_key=="k1"].role': 'Freelance design',
      'exp[_key=="k1"].roleEn': 'Freelance design',
      'exp[_key=="k1"].type': '',
      'exp[_key=="k1"].typeEn': '',
      'exp[_key=="k1"].projectHref': '/projekter/huslaegens-bord-podcast',
      'exp[_key=="k2"].projectHref': '/projekter/kfum-kfuk',
      'exp[_key=="k3"].projectHref': '/projekter/booklab',
      'exp[_key=="k5"].projectHref': '/projekter/vid-sans',
      'exp[_key=="k6"].projectHref': '/projekter/booklab',
      'vol[_key=="k0"].projectHref': '/projekter/velo-magazine',
      'vol[_key=="k1"].projectHref': '/projekter/sportx',
      'vol[_key=="k3"].projectHref': '/projekter/aarhus-bornehojskole',
      'awards[_key=="k0"].projectHref': '/projekter/ba-afgangs-eksamen',
    }).commit()
    console.log('✓', id, 'opdateret')
  }
}
run().catch(e => { console.error(e); process.exit(1) })
