import { createClient } from '@sanity/client'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

async function fix() {
  const items = await client.fetch(`*[_type == "fotografiItem" && src match "*Flâneur*" || _type == "fotografiItem" && src match "*Fl?neur*"]`)
  console.log(`Found ${items.length} items to fix`)
  const tx = client.transaction()
  for (const item of items) {
    const newSrc = item.src.replace(/\/fotografier\/Fl.{1,3}neur\//, '/fotografier/Flaneur/')
    if (newSrc !== item.src) {
      tx.patch(item._id, { set: { src: newSrc } })
      console.log(`  ${item.src} → ${newSrc}`)
    }
  }
  await tx.commit()
  console.log('✓ Done')
}

fix().catch(console.error)
