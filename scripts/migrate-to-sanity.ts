import { createClient } from '@sanity/client'
import { PROJECTS } from '../lib/projects'

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('❌  Set SANITY_WRITE_TOKEN before running this script.')
  console.error('   Get a token at: https://sanity.io/manage → project → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token,
  useCdn: false,
})

function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `s${i}`, text, marks: [] }],
  }))
}

async function migrate() {
  console.log(`Migrating ${PROJECTS.length} projects to Sanity…\n`)

  for (const [i, p] of PROJECTS.entries()) {
    const doc = {
      _type: 'project',
      _id: `project-${p.slug}`,
      title: p.title,
      titleEn: p.titleEn,
      slug: { _type: 'slug', current: p.slug },
      category: p.category,
      year: p.year,
      body: toBlocks(p.body),
      bodyEn: toBlocks(p.bodyEn),
      externalLink: p.externalLink ?? '',
      sortOrder: i + 1,
    }

    await client.createOrReplace(doc)
    console.log(`✓ [${i + 1}/${PROJECTS.length}] ${p.title}`)
  }

  console.log('\n✅ Migration complete. Open /studio to see your projects.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
