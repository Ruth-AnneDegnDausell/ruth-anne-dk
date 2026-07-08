import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })

// Rækkefølge i projektgalleriet - jonas_vuelta som cover
const FILES = ['jonas_vuelta', '1', '3', '4', '5', '11', '12', '14', '15', 'Skitse11', 'Skitse13']

async function run() {
  const id = 'project-tour-de-france-2025'
  if (await client.getDocument(id).catch(() => null)) { console.log('findes allerede'); return }

  // Genbrug de billeder der allerede er uploadet til illustrationsgalleriet
  const docs = await client.fetch<Array<{ src: string; imageAsset: any }>>(
    `*[_type == "illustrationItem" && defined(imageAsset.asset)]{ "src": src, imageAsset }`
  )
  const bySrc = new Map(docs.map(d => [d.src, d.imageAsset]))

  const gallery = []
  for (const f of FILES) {
    const asset = bySrc.get(`/illustrationer/Cykel/${f}.webp`)
    if (!asset) { console.log('⚠ mangler asset for', f); continue }
    gallery.push({ _key: 'g-' + f.toLowerCase(), _type: 'galleryItem', image: asset })
  }

  const cover = bySrc.get('/illustrationer/Cykel/jonas_vuelta.webp')

  const tx = client.transaction()
  tx.create({
    _id: id,
    _type: 'project',
    title: 'Tour de France 2025 · Illustrationer',
    titleEn: 'Tour de France 2025 · Illustrations',
    slug: { _type: 'slug', current: 'tour-de-france-2025' },
    year: '2025',
    categories: [{ _key: 'cat-illustration', _type: 'reference', _ref: 'projektKat-illustration' }],
    body: [{
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s', marks: [], text: 'En serie illustrationer tegnet under Tour de France 2025. Portrætter af ryttere og øjeblikke fra løbet, tegnet dag for dag mens etaperne blev kørt.' }],
    }],
    bodyEn: [{
      _type: 'block', _key: 'b0', style: 'normal', markDefs: [],
      children: [{ _type: 'span', _key: 'b0s', marks: [], text: 'A series of illustrations drawn during the Tour de France 2025. Portraits of riders and moments from the race, drawn day by day as the stages unfolded.' }],
    }],
    cover,
    gallery,
    sortOrder: 0,
  })
  // Læg det lige efter Tour de France 2026 i rækkefølgen
  tx.patch('projekterIndex', p => p.insert('after', 'order[0]', [{ _key: 'o-' + id, _type: 'reference', _ref: id }]))
  await tx.commit()
  console.log(`✓ Tour de France 2025 oprettet med ${gallery.length} illustrationer (cover: Jonas Vingegaard)`)
}
run().catch(e => { console.error(e); process.exit(1) })
