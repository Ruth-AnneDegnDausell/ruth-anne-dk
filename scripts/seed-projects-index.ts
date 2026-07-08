/**
 * Seeds project categories + the projekterIndex singleton (order & forside)
 * from the current data: each project's legacy category string becomes a
 * reference, order follows sortOrder, featured follows the featured flag.
 * Safe to re-run — existing per-project category choices are kept.
 *
 * Run: npx sanity exec scripts/seed-projects-index.ts --with-user-token
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const CATS = [
  { slug: 'branding', label: 'Branding', labelEn: 'Branding' },
  { slug: 'illustration', label: 'Illustration', labelEn: 'Illustration' },
  { slug: 'ux-ui', label: 'UX · UI', labelEn: 'UX · UI' },
]

const catId = (slug: string) => 'projektKat-' + slug.replace(/[^a-zA-Z0-9]/g, '')

async function run() {
  const tx = client.transaction()

  // 1. Kategori-dokumenter
  for (const c of CATS) {
    tx.createOrReplace({ _id: catId(c.slug), _type: 'projektKategori', ...c })
  }

  // 2. Kategori-referencer på projekterne (kun hvor de mangler)
  const projects = await client.fetch<Array<{ _id: string; category?: string; categories?: unknown[]; sortOrder?: number; featured?: boolean }>>(
    `*[_type == "project"] | order(sortOrder asc){ _id, category, categories, sortOrder, featured }`
  )
  for (const p of projects) {
    if (!p.categories?.length && p.category) {
      tx.patch(p._id, patch => patch.set({
        categories: [{ _key: 'cat-' + p.category, _type: 'reference', _ref: catId(p.category!) }],
      }))
    }
  }

  // 3. Rækkefølge & forside
  tx.createOrReplace({
    _id: 'projekterIndex',
    _type: 'projekterIndex',
    order: projects.map(p => ({ _key: 'o-' + p._id, _type: 'reference', _ref: p._id })),
    featured: projects.filter(p => p.featured).slice(0, 3).map(p => ({ _key: 'f-' + p._id, _type: 'reference', _ref: p._id })),
  })
  tx.delete('drafts.projekterIndex')

  await tx.commit()
  console.log(`✓ ${CATS.length} kategorier, ${projects.length} projekter i rækkefølge, ${projects.filter(p => p.featured).slice(0, 3).length} forside-projekter`)
}

run().catch(err => { console.error(err); process.exit(1) })
