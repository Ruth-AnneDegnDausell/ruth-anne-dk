import { createClient } from '@sanity/client'
import { nanoid } from 'nanoid'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

async function run() {
  const docs = await client.fetch<Array<{ _id: string; slug: { current: string }; imagePaths?: string[] }>>(
    `*[_type == "project"]{ _id, slug, imagePaths }`
  )
  console.log(`Found ${docs.length} projects`)

  const tx = client.transaction()

  for (const doc of docs) {
    const paths = doc.imagePaths ?? []
    if (!paths.length) {
      console.log(`  ⚠ ${doc.slug?.current} — no imagePaths, skipping`)
      continue
    }

    const gallery = paths.map((path: string) => ({
      _type: 'galleryItem',
      _key: nanoid(),
      path,
    }))

    tx.patch(doc._id, {
      set: { gallery },
      unset: ['imagePaths', 'images'],
    })
    console.log(`  ✓ ${doc.slug?.current} — ${gallery.length} items`)
  }

  await tx.commit()
  console.log('\n✓ Migration complete')
}

run().catch(console.error)
