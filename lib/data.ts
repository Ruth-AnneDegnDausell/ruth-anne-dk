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
  const sanityImage = raw.cover ?? null
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
    cover: sanityImage ? urlFor(sanityImage).width(1600).url() : raw.coverPath ?? undefined,
    coverThumb: sanityImage ? urlFor(sanityImage).width(800).height(600).fit('crop').url() : undefined,
    coverPosition: raw.coverPosition ?? undefined,
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
      const sanityGalleryItems = (raw.gallery ?? []).map((item: any) => {
        if (item.image?.asset) {
          let b = urlFor(item.image)
          if (item.rotation) b = b.orientation(rotationToOrientation(item.rotation) as any)
          return b.url()
        }
        if (item.path) return item.path as string
        return null
      }).filter(Boolean) as string[]

      // Append static images not already covered by the Sanity gallery
      const sanityPaths = new Set(raw.gallery?.map((i: any) => i.path).filter(Boolean) ?? [])
      const extraStatic = (staticProject?.images ?? []).filter(p => !sanityPaths.has(p))
      const galleryImages = [...sanityGalleryItems, ...extraStatic]

      const sanityImage = raw.cover ?? null
      return {
        ...fromSanity(raw),
        cover: sanityImage ? urlFor(sanityImage).width(1600).url() : raw.coverPath ?? staticProject?.cover,
        coverThumb: sanityImage ? urlFor(sanityImage).width(800).height(600).fit('crop').url() : undefined,
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

// ── Udtalelser ────────────────────────────────────────────────────────────────

export type UdtalelseDoc = {
  source: string
  author: string
  role: string
  year: string
  fileUrl: string
  mimeType: string
}

export async function getUdtalelser(): Promise<UdtalelseDoc[] | null> {
  try {
    const raw = await sanityClient.fetch(
      groq`*[_type == "udtalelser" && _id == "udtalelser"][0]{
        items[]{ source, author, role, year, "fileUrl": file.asset->url, "mimeType": file.asset->mimeType }
      }`,
      {},
      { next: { revalidate: 60 } },
    )
    if (raw?.items?.length) return raw.items as UdtalelseDoc[]
  } catch {}
  return null
}

// ── Gallery ───────────────────────────────────────────────────────────────────

export type GalleryCategory = { id: string; da: string; en: string }
export type GalleryData = {
  categories: GalleryCategory[]
  byCategory: Record<string, GalleryItem[]>
  allItems: GalleryItem[]
}

function sanityGalleryItemToItem(raw: any, defaultAspect: string): GalleryItem {
  const imageAsset = raw.image ?? raw.imageAsset
  let src = raw.src as string | undefined
  if (imageAsset?.asset) {
    let b = urlFor(imageAsset)
    if (raw.rotation) b = b.orientation(rotationToOrientation(raw.rotation) as any)
    src = b.url()
  }
  return {
    src,
    aspect: raw.aspect ?? defaultAspect,
    alt: raw.alt || undefined,
  }
}

function buildGalleryData(
  sanityCategories: any[] | null,
  staticItems: GalleryItem[],
  staticCats: GalleryCategory[],
  defaultAspect: string,
): GalleryData {
  if (sanityCategories?.length) {
    const byCategory: Record<string, GalleryItem[]> = {}
    const seenKeys = new Set<string>()
    const allItems: GalleryItem[] = []

    for (const cat of sanityCategories) {
      const catItems: GalleryItem[] = []
      for (const item of cat.items ?? []) {
        const gi = sanityGalleryItemToItem(item, defaultAspect)
        catItems.push(gi)
        const key = item._key ?? gi.src ?? ''
        if (!seenKeys.has(key)) {
          seenKeys.add(key)
          allItems.push(gi)
        }
      }
      byCategory[cat.slug] = catItems
    }

    return {
      categories: sanityCategories.map(c => ({ id: c.slug, da: c.label ?? c.slug, en: c.labelEn ?? c.label ?? c.slug })),
      byCategory,
      allItems,
    }
  }

  // Static fallback: group by category field on each item
  const byCategory: Record<string, GalleryItem[]> = {}
  for (const cat of staticCats) {
    byCategory[cat.id] = staticItems.filter(item => {
      if (!item.category) return false
      return Array.isArray(item.category) ? item.category.includes(cat.id) : item.category === cat.id
    })
  }
  return { categories: staticCats, byCategory, allItems: staticItems }
}

const FOTO_CATS: GalleryCategory[] = [
  { id: 'velomore', da: 'VeloMore', en: 'VeloMore' },
  { id: 'booklab', da: 'BookLab', en: 'BookLab' },
  { id: 'flaneur', da: 'Flâneur', en: 'Flâneur' },
  { id: 'konfirmation', da: 'Konfirmation', en: 'Confirmation' },
  { id: 'personlig', da: 'Personlige projekter', en: 'Personal projects' },
]

const ILL_CATS: GalleryCategory[] = [
  { id: 'cykel', da: 'Cykel', en: 'Cycling' },
  { id: 'portræt', da: 'Portræt', en: 'Portrait' },
  { id: 'vidsans', da: 'Vid & Sans', en: 'Vid & Sans' },
  { id: 'kfum', da: 'KFUM & KFUK', en: 'KFUM & KFUK' },
  { id: 'diverse', da: 'Diverse', en: 'Various' },
]

const gallerySingletonQuery = groq`
  categories[]{
    slug, label, labelEn,
    items[]{ _key, image{ asset, hotspot, crop }, aspect, alt, rotation }
  }
`

export async function getFotografierGallery(): Promise<GalleryData> {
  try {
    const raw = await sanityClient.fetch(
      groq`*[_type == "fotografierGallery"][0]{ ${gallerySingletonQuery} }`,
      {},
      { next: { revalidate: 60 } },
    )
    return buildGalleryData(raw?.categories ?? null, FOTOGRAFIER, FOTO_CATS, 'aspect-[4/3]')
  } catch {}
  return buildGalleryData(null, FOTOGRAFIER, FOTO_CATS, 'aspect-[4/3]')
}

export async function getIllustrationerGallery(): Promise<GalleryData> {
  try {
    const raw = await sanityClient.fetch(
      groq`*[_type == "illustrationerGallery"][0]{ ${gallerySingletonQuery} }`,
      {},
      { next: { revalidate: 60 } },
    )
    return buildGalleryData(raw?.categories ?? null, ILLUSTRATIONER, ILL_CATS, 'aspect-[2/3]')
  } catch {}
  return buildGalleryData(null, ILLUSTRATIONER, ILL_CATS, 'aspect-[2/3]')
}
