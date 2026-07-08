import { groq } from 'next-sanity'
import { sanityClient, urlFor } from './sanity'
import { PROJECTS } from './projects'
import type { Project } from './projects'
import { FOTOGRAFIER, ILLUSTRATIONER, type GalleryItem } from './gallery'

// Sanity CDN's 'or'-parameter tager grader direkte (0/90/180/270)
const VALID_ROTATIONS = [90, 180, 270]
function withRotation(b: any, deg: unknown) {
  return VALID_ROTATIONS.includes(deg as number) ? b.orientation(deg as number) : b
}

function extractBody(blocks: unknown[]): string[] {
  if (!Array.isArray(blocks)) return []
  return blocks
    .map((b: any) => b?.children?.map((c: any) => c?.text ?? '').join('') ?? '')
    .filter(Boolean)
}

function fromSanity(raw: any): Project {
  const legacyLabel = raw.category === 'ux-ui' ? 'UX · UI' : raw.category === 'illustration' ? 'Illustration' : 'Branding'
  // Nye kategori-referencer har forrang; gammel streng-kategori som fallback
  const cats: Array<{ id: string; da: string; en: string }> = (raw.cats ?? [])
    .filter((c: any) => c?.id)
    .map((c: any) => ({ id: c.id, da: c.da ?? c.id, en: c.en ?? c.da ?? c.id }))
  if (!cats.length && raw.category) cats.push({ id: raw.category, da: legacyLabel, en: legacyLabel })
  const sanityImage = raw.cover ?? null
  return {
    id: raw.sortOrder ?? 0,
    slug: raw.slug,
    category: raw.category ?? cats[0]?.id ?? 'branding',
    categories: cats,
    categoryLabel: cats[0]?.da ?? legacyLabel,
    categoryLabelEn: cats[0]?.en ?? legacyLabel,
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
  "cats": categories[]->{ "id": slug, "da": label, "en": labelEn },
  body, bodyEn,
  "cover": select(defined(cover.asset->) => cover{ asset, hotspot, crop }, null),
  coverPath,
  coverPosition,
  gallery[]{
    _key, _type,
    path,
    image{ asset, hotspot, crop },
    rotation,
    aspect
  },
  externalLink,
  sortOrder,
}`

const allQuery = groq`*[_type == "project"] | order(sortOrder asc){
  title, titleEn,
  "slug": slug.current,
  category, year,
  "cats": categories[]->{ "id": slug, "da": label, "en": labelEn },
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
          // Valgfrit format: beskær fysisk via CDN så hotspottet respekteres
          if (item.aspect === 'horizontal') b = b.width(1600).height(1200).fit('crop')
          else if (item.aspect === 'vertical') b = b.width(1200).height(1600).fit('crop')
          else if (item.aspect === 'square') b = b.width(1400).height(1400).fit('crop')
          else b = b.width(1600)
          b = withRotation(b, item.rotation)
          return b.url()
        }
        if (item.path) return item.path as string
        return null
      }).filter(Boolean) as string[]

      // Sanity-galleriet er eneste sandhed: slettes et billede i Studio, forsvinder det
      // fra sitet. Statiske billeder bruges kun hvis projektet slet intet galleri har i Sanity.
      const galleryImages = raw.gallery?.length ? sanityGalleryItems : (staticProject?.images ?? [])

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
    const [items, index] = await Promise.all([
      sanityClient.fetch(allQuery, {}, { next: { revalidate: 60 } }),
      sanityClient.fetch(
        groq`*[_id == "projekterIndex"][0]{
          "order": order[]->slug.current,
          "featured": featured[]->slug.current,
        }`,
        {},
        { next: { revalidate: 60 } },
      ),
    ])
    if (items?.length) {
      let projects: Project[] = items.map(fromSanity)

      // Rækkefølge styret fra "Projekter · Rækkefølge & forside"
      const order: string[] = index?.order ?? []
      if (order.length) {
        projects = [...projects].sort((a, b) => {
          const ia = order.indexOf(a.slug)
          const ib = order.indexOf(b.slug)
          return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib)
        })
      }

      // Forside-valg styret samme sted (fallback: featured-flag på projektet)
      const featured: string[] = index?.featured ?? []
      if (featured.length) {
        projects = projects.map(p => ({ ...p, featured: featured.includes(p.slug) }))
      }

      return projects
    }
  } catch {}
  return PROJECTS
}

// Forside-projekter i den valgte rækkefølge
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects()
  try {
    const index = await sanityClient.fetch(
      groq`*[_id == "projekterIndex"][0]{ "featured": featured[]->slug.current }`,
      {},
      { next: { revalidate: 60 } },
    )
    const featured: string[] = index?.featured ?? []
    if (featured.length) {
      return featured
        .map(slug => projects.find(p => p.slug === slug))
        .filter(Boolean) as Project[]
    }
  } catch {}
  return projects.filter(p => p.featured).slice(0, 3)
}

// ── Forside ───────────────────────────────────────────────────────────────────

export async function getForside() {
  const raw = await fetchSingleton<any>('forside')
  if (!raw) return null
  return {
    ...raw,
    heroImageUrl: raw.heroImage?.asset
      ? urlFor(raw.heroImage).width(1400).url()
      : null,
  }
}

// ── About ─────────────────────────────────────────────────────────────────────

export async function getAboutArbejde() {
  return fetchSingleton<any>('about-arbejde')
}

export async function getAboutPrivat() {
  const raw = await fetchSingleton<any>('about-privat')
  if (!raw) return null
  return {
    ...raw,
    photoUrl: raw.photo?.asset ? urlFor(raw.photo).width(1200).height(1600).fit('crop').url() : null,
  }
}

// ── Kontakt ───────────────────────────────────────────────────────────────────

export async function getKontakt() {
  return fetchSingleton<any>('kontakt')
}

// ── Fleksjob ──────────────────────────────────────────────────────────────────

export async function getFleksjob() {
  return fetchSingleton<any>('fleksjob')
}

export async function getOrdningen() {
  return fetchSingleton<any>('ordningen')
}

// ── CV ────────────────────────────────────────────────────────────────────────

export async function getCV() {
  const raw = await fetchSingleton<any>('cv')
  if (!raw) return null
  // file-<hash>-pdf → https://cdn.sanity.io/files/<projekt>/<dataset>/<hash>.pdf
  const ref: string | undefined = raw.pdfFile?.asset?._ref
  const m = ref?.match(/^file-([a-f0-9]+)-(\w+)$/)
  return {
    ...raw,
    pdfUrl: m
      ? `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${m[1]}.${m[2]}`
      : null,
  }
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

// Aspect-klasse → CDN-beskæringsmål, så hotspottet styrer udsnittet
const ASPECT_DIMS: Record<string, [number, number]> = {
  'aspect-[4/3]': [1600, 1200],
  'aspect-[3/2]': [1600, 1067],
  'aspect-[16/9]': [1600, 900],
  'aspect-[7/5]': [1600, 1143],
  'aspect-square': [1400, 1400],
  'aspect-[4/5]': [1200, 1500],
  'aspect-[2/3]': [1200, 1800],
  'aspect-[5/7]': [1200, 1680],
}

function sanityGalleryItemToItem(raw: any, defaultAspect: string): GalleryItem {
  const imageAsset = raw.image ?? raw.imageAsset
  let src = raw.src as string | undefined
  let full = src
  const aspect = raw.aspect ?? defaultAspect
  if (imageAsset?.asset) {
    let b = urlFor(imageAsset)
    const dims = ASPECT_DIMS[aspect]
    if (dims) b = b.width(dims[0]).height(dims[1]).fit('crop')
    else b = b.width(1600)
    b = withRotation(b, raw.rotation)
    src = b.url()
    // Ubeskåret fuld version til lightbox
    full = withRotation(urlFor(imageAsset).width(2000), raw.rotation).url()
  }
  return {
    src,
    full,
    aspect,
    alt: raw.alt || undefined,
  }
}

function buildGalleryData(
  raw: { categories?: any[]; items?: any[] } | null,
  staticItems: GalleryItem[],
  staticCats: GalleryCategory[],
  defaultAspect: string,
): GalleryData {
  // Flad liste: items-rækkefølgen ER gitteret; kategorier er kun filter-tags
  if (raw?.items?.length) {
    const allItems: GalleryItem[] = []
    const byCategory: Record<string, GalleryItem[]> = {}
    const cats = (raw.categories ?? []).filter((c: any) => c?.slug)
    for (const cat of cats) byCategory[cat.slug] = []

    for (const item of raw.items) {
      const gi = sanityGalleryItemToItem(item, defaultAspect)
      allItems.push(gi)
      for (const slug of item.cats ?? []) {
        if (byCategory[slug]) byCategory[slug].push(gi)
      }
    }

    return {
      categories: cats.map((c: any) => ({ id: c.slug, da: c.label ?? c.slug, en: c.labelEn ?? c.label ?? c.slug })),
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
  "categories": categoryOrder[]->{ slug, label, labelEn },
  items[]{ _key, image{ asset, hotspot, crop }, aspect, alt, rotation, "cats": categories[]->slug }
`

export async function getFotografierGallery(): Promise<GalleryData> {
  try {
    const raw = await sanityClient.fetch(
      groq`*[_type == "fotografierGallery"][0]{ ${gallerySingletonQuery} }`,
      {},
      { next: { revalidate: 60 } },
    )
    return buildGalleryData(raw ?? null, FOTOGRAFIER, FOTO_CATS, 'aspect-[4/3]')
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
    return buildGalleryData(raw ?? null, ILLUSTRATIONER, ILL_CATS, 'aspect-[2/3]')
  } catch {}
  return buildGalleryData(null, ILLUSTRATIONER, ILL_CATS, 'aspect-[2/3]')
}
