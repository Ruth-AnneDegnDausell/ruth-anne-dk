import { createClient } from '@sanity/client'
import fs from 'fs'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false })
async function run() {
  const asset = await client.assets.upload('file', fs.createReadStream('/tmp/ruth-anne-cv.pdf'), {
    filename: 'Ruth-Anne-Dausell-CV.pdf',
    contentType: 'application/pdf',
  })
  await client.patch('cv').set({
    pdfFile: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
  }).commit()
  console.log('✓ CV-PDF uploadet og koblet på:', asset.url)
}
run().catch(e => { console.error(e); process.exit(1) })
