import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })

async function run() {
  const id = 'project-tour-de-france-2026'
  const existing = await client.getDocument(id).catch(() => null)
  if (existing) { console.log('findes allerede'); return }

  const tx = client.transaction()
  tx.create({
    _id: id,
    _type: 'project',
    title: 'Tour de France 2026 · Illustrationer',
    titleEn: 'Tour de France 2026 · Illustrations',
    slug: { _type: 'slug', current: 'tour-de-france-2026' },
    year: '2026',
    categories: [{ _key: 'cat-illustration', _type: 'reference', _ref: 'projektKat-illustration' }],
    body: [{
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s', marks: [], text: 'Illustrationer tegnet under Tour de France 2026.' }],
    }],
    bodyEn: [{
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s', marks: [], text: 'Illustrations drawn during the Tour de France 2026.' }],
    }],
    gallery: [],
    sortOrder: 0,
  })
  // Sæt projektet forrest i rækkefølgen
  tx.patch('projekterIndex', p => p.insert('before', 'order[0]', [{ _key: 'o-' + id, _type: 'reference', _ref: id }]))
  await tx.commit()
  console.log('✓ Tour de France 2026 oprettet og lagt forrest i projektgalleriet')
}
run().catch(e => { console.error(e); process.exit(1) })
