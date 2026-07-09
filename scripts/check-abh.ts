import { createClient } from '@sanity/client'
const c = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  const d = await c.getDocument('project-aarhus-bornehojskole')
  const cov = d?.cover
  console.log('cover asset:', cov?.asset?._ref)
  console.log('crop:', JSON.stringify(cov?.crop))
  console.log('hotspot:', JSON.stringify(cov?.hotspot))
  console.log('coverPosition:', d?.coverPosition)
}
run().catch(e=>{console.error(e);process.exit(1)})
