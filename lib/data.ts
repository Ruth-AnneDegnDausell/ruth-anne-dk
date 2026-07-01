import { groq } from 'next-sanity'
import { sanityClient, urlFor } from './sanity'
import { PROJECTS } from './projects'
import type { Project } from './projects'
import { FOTOGRAFIER, ILLUSTRATIONER, type GalleryItem } from './gallery'

// Maps rotation degrees to EXIF orientation for Sanity CDN
function rotationToOrientation(deg: number): number {
  const map: Record<number, number> = { 0: 1, 90: 6, 180: 3, 270: 8 }
  return map[deg] ?? 1
}

function extractBody(blocks: unknown[]): string[] {
  if (!Array.isArray(blocks)) return []
  return blocks
    .map((b: any) => b?.children?.map((c: any) => c?.text ?? '').join('') ?? '')
    .filter(Boolean)
}

function fromSanity(raw: any): Project {
  const catLabel = raw.category === 'ux-ui' ? 'UX · UI' : raw.category === 'illustration' ? 'Illustration' : 'Branding'
  return {
    id: raw.sortOrder ?? 0,
    slug: raw.slug,
    category: raw.category ?? 'branding',
    categoryLabel: catLabel,
    categoryLabelEn: catLabel,
    title: raw.title ?? '',
    titleEn: raw.titleEn ?? raw.title ?? '',
    year: raw.year ?? '',
    desc: raw.desc ?? '',
    descEn: raw.descEn ?? raw.desc ?? '',
    body: extractBody(raw.body),
    bodyEn: extractBody(raw.bodyEn),
    cover: raw.cover ? urlFor(raw.cover).width(1600).url() : raw.coverPath ?? undefined,
    coverPosition: raw.coverPosition ?? 'object-top',
    images: raw.images?.map((img: any) => urlFor(img).width(1600).url()) ?? [],
    externalLink: raw.externalLink,
    featured: raw.featured ?? false,
  }
}

async function fetchSingleton<T>(id: string): Promise<T | null> {
  try {
    const raw = await sanityClient.fetch(
      groq`*[_id == $id][0]`,
      { id },
      { next: { revalidate: 60 } },
    )
    return raw ?? null
  } catch {
    return null
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────

const slugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title, titleEn,
  "slug": slug.current,
  category, year,
  body, bodyEn,
  "cover": select(defined(cover.asset->) => cover{ asset, hotspot, crop }, null),
  coverPath,
  coverPosition,
  gallery[]{
    _key, _type,
    path,
    image{ asset, hotspot, crop },
    rotation
  },
  externalLink,
  sortOrder,
}`

const allQuery = groq`*[_type == "project"] | order(sortOrder asc){
  title, titleEn,
  "slug": slug.current,
  category, year,
  desc, descEn,
  featured,
  "cover": select(defined(cover.asset->) => cover{ asset, hotspot, crop }, null),
  coverPath, coverPosition,
  sortOrder,
}`

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await sanityClient.fetch(slugQuery, { slug }, { next: { revalidate: 60 } })
    if (raw) {
      const staticProject = PROJECTS.find(p => p.slug === slug)
      const galleryImages: string[] = raw.gallery?.length
        ? raw.gallery.map((item: any) => {
            if (item.image?.asset) {
              let b = urlFor(item.image)
              if (item.rotation) b = b.orientation(rotationToOrientation(item.rotation) as any)
              return b.url()
            }
            if (item.path) return item.path as string
            return null
          }).filter(Boolean)
        : (staticProject?.images ?? [])

      return {
        ...fromSanity(raw),
        cover: raw.cover ? urlFor(raw.cover).width(1600).url() : raw.coverPath ?? staticProject?.cover,
        images: galleryImages,
        coverPosition: raw.coverPosition ?? staticProject?.coverPosition,
        videos: staticProject?.videos,
        testimonialRef: staticProject?.testimonialRef,
        galleryLinks: staticProject?.galleryLinks,
      }
    }
  } catch {}
  return PROJECTS.find(p => p.slug === slug) ?? null
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const items = await sanityClient.fetch(allQuery, {}, { next: { revalidate: 60 } })
    if (items?.length) return items.map(fromSanity)
  } catch {}
  return PROJECTS
}

// ── About ─────────────────────────────────────────────────────────────────────

export async function getAboutArbejde() {
  return fetchSingleton<any>('about-arbejde')
}

export async function getAboutPrivat() {
  return fetchSingleton<any>('about-privat')
}

// ── Kontakt ───────────────────────────────────────────────────────────────────

export async function getKontakt() {
  return fetchSingleton<any>('kontakt')
}

// ── Fleksjob ──────────────────────────────────────────────────────────────────

export async function getFleksjob() {
  return fetchSingleton<any>('fleksjob')
}

// ── CV ────────────────────────────────────────────────────────────────────────

export async function getCV() {
  return fetchSingleton<any>('cv')
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function sanityItemToGallery(item: any): GalleryItem {
  let src = item.src as string | undefined
  if (item.imageAsset?.asset) {
    let b = urlFor(item.imageAsset)
    if (item.rotation) b = b.orientation(rotationToOrientation(item.rotation) as any)
    src = b.url()
  }
  return {
    src,
    aspect: item.aspect ?? 'aspect-[4/3]',
    alt: item.alt || undefined,
    category: item.categories?.length === 1 ? item.categories[0] : item.categories ?? undefined,
  }
}

const galleryItemFields = groq`
  src, aspect, alt, sortOrder, rotation, categories,
  imageAsset{ asset, hotspot, crop }
`

export async function getFotografier(): Promise<GalleryItem[]> {
  try {
    const items = await sanityClient.fetch(
      groq`*[_type == "fotografiItem"] | order(sortOrder asc){ ${galleryItemFields} }`,
      {},
      { next: { revalidate: 60 } },
    )
    if (items?.length) return items.map(sanityItemToGallery)
  } catch {}
  return FOTOGRAFIER
}

export async function getIllustrationer(): Promise<GalleryItem[]> {
  try {
    const items = await sanityClient.fetch(
      groq`*[_type == "illustrationItem"] | order(sortOrder asc){ ${galleryItemFields} }`,
      {},
      { next: { revalidate: 60 } },
    )
    if (items?.length) return items.map(sanityItemToGallery)
  } catch {}
  return ILLUSTRATIONER
}
