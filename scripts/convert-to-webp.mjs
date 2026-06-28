import { readdir, unlink } from 'fs/promises'
import { join, extname, dirname, basename } from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) files.push(...await findImages(full))
    else if (/\.(png|jpe?g)$/i.test(e.name)) files.push(full)
  }
  return files
}

const images = await findImages(PUBLIC)
console.log(`Converting ${images.length} images to WebP...\n`)

for (const src of images) {
  const dir = dirname(src)
  const name = basename(src, extname(src))
  const dest = join(dir, `${name}.webp`)
  try {
    await sharp(src).webp({ quality: 88 }).toFile(dest)
    await unlink(src)
    const rel = src.replace(PUBLIC, '')
    console.log(`✓ ${rel}`)
  } catch (e) {
    console.error(`✗ ${src}: ${e.message}`)
  }
}

console.log('\nDone.')
