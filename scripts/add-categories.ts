import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false })
async function run() {
  const tx = client.transaction()
  tx.createOrReplace({ _id: 'projektKat-konceptuel', _type: 'projektKategori', slug: 'konceptuel', label: 'Konceptuel', labelEn: 'Conceptual' })
  tx.createOrReplace({ _id: 'projektKat-identitetsdesign', _type: 'projektKategori', slug: 'identitetsdesign', label: 'Identitetsdesign', labelEn: 'Identity design' })
  await tx.commit()
  console.log('✓ kategorier oprettet: Konceptuel, Identitetsdesign')
}
run().catch(e => { console.error(e); process.exit(1) })
