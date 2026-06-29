/**
 * Uploads all static images to Sanity CDN and patches documents with asset references.
 * Safe to re-run: already-uploaded files are deduplicated by Sanity (same hash = same asset).
 *
 * Run: SANITY_WRITE_TOKEN=... npx tsx scripts/upload-all-to-sanity.ts
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

const PUBLIC = '/Users/ruth-annedausell/ruth-anne-dk/public'

// Cache: path → asset _id (so we don't re-upload same file twice in same run)
const uploadCache = new Map<string, string>()

async function uploadFile(filePath: string): Promise<string | null> {
  if (uploadCache.has(filePath)) return uploadCache.get(filePath)!

  const abs = `${PUBLIC}${filePath}`
  if (!fs.existsSync(abs)) {
    console.log(`  ⚠ Not found: ${filePath}`)
    return null
  }

  const filename = path.basename(filePath)
  const stream = fs.createReadStream(abs)
  try {
    const asset = await client.assets.upload('image', stream, { filename })
    uploadCache.set(filePath, asset._id)
    return asset._id
  } catch (err: any) {
    console.log(`  ✗ Upload failed: ${filePath} — ${err.message}`)
    return null
  }
}

function imageRef(assetId: string) {
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: assetId } }
}

// ── 1. Project covers + gallery ───────────────────────────────────────────────

async function migrateProjects() {
  console.log('\n── Projects ─────────────────────────────────────────────')
  const docs = await client.fetch<Array<{
    _id: string
    slug: { current: string }
    coverPath?: string
    cover?: { asset?: unknown }
    gallery?: Array<{ _key: string; _type: string; path?: string; image?: { asset?: unknown } }>
  }>>(`*[_type == "project"]{ _id, slug, coverPath, cover, gallery[] }`)

  let updated = 0
  for (const doc of docs) {
    const patch: Record<string, unknown> = {}
    let changed = false

    // Cover
    if (doc.coverPath && !doc.cover?.asset) {
      const id = await uploadFile(doc.coverPath)
      if (id) { patch['cover'] = imageRef(id); changed = true }
    }

    // Gallery items
    if (doc.gallery?.length) {
      const newGallery = await Promise.all(
        doc.gallery.map(async (item) => {
          if (item.path && !item.image?.asset) {
            const id = await uploadFile(item.path)
            if (id) return { ...item, image: imageRef(id) }
          }
          return item
        })
      )
      if (JSON.stringify(newGallery) !== JSON.stringify(doc.gallery)) {
        patch['gallery'] = newGallery
        changed = true
      }
    }

    if (changed) {
      await client.patch(doc._id).set(patch).commit()
      console.log(`  ✓ ${doc.slug?.current}`)
      updated++
    } else {
      console.log(`  – ${doc.slug?.current} (ingen ændringer)`)
    }
  }
  console.log(`  → ${updated}/${docs.length} projekter opdateret`)
}

// ── 2. Fotografier ────────────────────────────────────────────────────────────

async function migrateFotografier() {
  console.log('\n── Fotografier ──────────────────────────────────────────')
  const docs = await client.fetch<Array<{
    _id: string
    src?: string
    imageAsset?: { asset?: unknown }
  }>>(`*[_type == "fotografiItem"]{ _id, src, imageAsset }`)

  let updated = 0
  for (const doc of docs) {
    if (!doc.src || doc.imageAsset?.asset) { process.stdout.write('.'); continue }

    const id = await uploadFile(doc.src)
    if (id) {
      await client.patch(doc._id).set({ imageAsset: imageRef(id) }).commit()
      process.stdout.write('✓')
      updated++
    } else {
      process.stdout.write('✗')
    }
  }
  console.log(`\n  → ${updated}/${docs.length} fotografier opdateret`)
}

// ── 3. Illustrationer ─────────────────────────────────────────────────────────

async function migrateIllustrationer() {
  console.log('\n── Illustrationer ───────────────────────────────────────')
  const docs = await client.fetch<Array<{
    _id: string
    src?: string
    imageAsset?: { asset?: unknown }
  }>>(`*[_type == "illustrationItem"]{ _id, src, imageAsset }`)

  let updated = 0
  for (const doc of docs) {
    if (!doc.src || doc.imageAsset?.asset) { process.stdout.write('.'); continue }

    const id = await uploadFile(doc.src)
    if (id) {
      await client.patch(doc._id).set({ imageAsset: imageRef(id) }).commit()
      process.stdout.write('✓')
      updated++
    } else {
      process.stdout.write('✗')
    }
  }
  console.log(`\n  → ${updated}/${docs.length} illustrationer opdateret`)
}

async function run() {
  console.log('Uploader billeder til Sanity CDN...')
  console.log(`Public dir: ${PUBLIC}\n`)

  await migrateProjects()
  await migrateFotografier()
  await migrateIllustrationer()

  console.log('\n✓ Færdig! Alle billeder er nu på Sanity CDN.')
  console.log('  Deploy sitet for at aktivere rotation og beskæring på alle billeder.')
}

run().catch(console.error)
