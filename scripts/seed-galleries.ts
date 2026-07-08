/**
 * Seeds the fotografierGallery + illustrationerGallery singletons (flat item
 * list + category reference docs) from the static data in lib/gallery.ts,
 * reusing image assets already uploaded to Sanity (matched by src path via
 * fotografiItem/illustrationItem docs). Missing assets are uploaded from
 * /public. Safe to re-run — overwrites both gallery docs and category docs.
 *
 * Run: npx sanity exec scripts/seed-galleries.ts --with-user-token
 *  or: SANITY_WRITE_TOKEN=... npx tsx scripts/seed-galleries.ts
 */
import { createClient } from '@sanity/client'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { FOTOGRAFIER, ILLUSTRATIONER, type GalleryItem } from '../lib/gallery'

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const PUBLIC = path.join(__dirname, '..', 'public')

const FOTO_CATS = [
  { id: 'velomore', da: 'VeloMore', en: 'VeloMore' },
  { id: 'booklab', da: 'BookLab', en: 'BookLab' },
  { id: 'flaneur', da: 'Flâneur', en: 'Flâneur' },
  { id: 'konfirmation', da: 'Konfirmation', en: 'Confirmation' },
  { id: 'personlig', da: 'Personlige projekter', en: 'Personal projects' },
]

const ILL_CATS = [
  { id: 'cykel', da: 'Cykel', en: 'Cycling' },
  { id: 'portræt', da: 'Portræt', en: 'Portrait' },
  { id: 'vidsans', da: 'Vid & Sans', en: 'Vid & Sans' },
  { id: 'kfum', da: 'KFUM & KFUK', en: 'KFUM & KFUK' },
  { id: 'diverse', da: 'Diverse', en: 'Various' },
]

// Deterministic ids/keys so re-runs produce identical documents (full hash — no collisions)
const keyFor = (src: string) => 'k' + crypto.createHash('sha1').update(src).digest('hex').slice(0, 24)
const catDocId = (prefix: string, slug: string) => `${prefix}-${Buffer.from(slug).toString('base64url').replace(/[^a-zA-Z0-9]/g, '')}`

async function assetMapFrom(type: string): Promise<Map<string, unknown>> {
  const docs = await client.fetch<Array<{ src?: string; imageAsset?: { asset?: unknown } }>>(
    `*[_type == "${type}" && defined(imageAsset.asset)]{ src, imageAsset }`
  )
  return new Map(docs.filter(d => d.src).map(d => [d.src!, d.imageAsset]))
}

async function uploadFromPublic(src: string): Promise<unknown | null> {
  const abs = path.join(PUBLIC, src)
  if (!fs.existsSync(abs)) { console.log(`  ⚠ Fil mangler: ${src}`); return null }
  const asset = await client.assets.upload('image', fs.createReadStream(abs), { filename: path.basename(src) })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// Gamle data bruger 'øvrige' for det der hedder 'diverse' på sitet
const normalizeCats = (c: string | string[] | undefined) =>
  (Array.isArray(c) ? c : c ? [c] : []).map(x => (x === 'øvrige' ? 'diverse' : x))

async function buildGallery(
  docId: string,
  itemType: string,
  catType: string,
  catIdPrefix: string,
  cats: typeof FOTO_CATS,
  items: GalleryItem[],
  assets: Map<string, unknown>,
) {
  const tx = client.transaction()

  // 1. Kategori-dokumenter
  for (const cat of cats) {
    tx.createOrReplace({
      _id: catDocId(catIdPrefix, cat.id),
      _type: catType,
      slug: cat.id,
      label: cat.da,
      labelEn: cat.en,
    })
  }

  // 2. Flad billedliste — rækkefølgen følger lib/gallery.ts (= sitets nuværende rækkefølge)
  const flatItems = []
  for (const item of items) {
    const src = item.src
    if (!src) continue
    let image = assets.get(src)
    if (!image) {
      image = await uploadFromPublic(src)
      if (image) assets.set(src, image)
    }
    if (!image) continue

    const itemCats = normalizeCats(item.category).filter(slug => cats.some(c => c.id === slug))
    flatItems.push({
      _key: keyFor(src),
      _type: itemType,
      image,
      alt: item.alt,
      aspect: item.aspect,
      rotation: 0,
      categories: itemCats.map(slug => ({
        _key: `c-${keyFor(src)}-${catDocId(catIdPrefix, slug)}`,
        _type: 'reference',
        _ref: catDocId(catIdPrefix, slug),
      })),
    })
  }

  // 3. Galleri-dokumentet
  tx.createOrReplace({
    _id: docId,
    _type: docId,
    categoryOrder: cats.map(cat => ({
      _key: `co-${catDocId(catIdPrefix, cat.id)}`,
      _type: 'reference',
      _ref: catDocId(catIdPrefix, cat.id),
    })),
    items: flatItems,
  })
  tx.delete(`drafts.${docId}`)

  await tx.commit()
  console.log(`  ✓ ${docId}: ${flatItems.length} billeder i ét samlet gitter, ${cats.length} kategorier`)
}

async function run() {
  console.log('── Fotografier · Galleri ────────────────────────')
  const fotoAssets = await assetMapFrom('fotografiItem')
  await buildGallery('fotografierGallery', 'fotGalleriItem', 'fotoKategori', 'fotoKat', FOTO_CATS, FOTOGRAFIER, fotoAssets)

  console.log('── Illustrationer · Galleri ─────────────────────')
  const illAssets = await assetMapFrom('illustrationItem')
  await buildGallery('illustrationerGallery', 'illGalleriItem', 'illKategori', 'illKat', ILL_CATS, ILLUSTRATIONER, illAssets)

  console.log('\n✓ Færdig! Åbn Studio → Fotografier/Illustrationer · Galleri.')
}

run().catch(err => { console.error(err); process.exit(1) })
