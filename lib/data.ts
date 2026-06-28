import { groq } from 'next-sanity'
import { sanityClient, urlFor } from './sanity'
import { PROJECTS } from './projects'
import type { Project } from './projects'

function extractBody(blocks: unknown[]): string[] {
  if (!Array.isArray(blocks)) return []
  return blocks
    .map((b: any) => b?.children?.map((c: any) => c?.text ?? '').join('') ?? '')
    .filter(Boolean)
}

function fromSanity(raw: any): Project {
  return {
    id: raw.sortOrder ?? 0,
    slug: raw.slug,
    category: raw.category ?? 'branding',
    categoryLabel: raw.category === 'ux-ui' ? 'UX · UI' : raw.category === 'illustration' ? 'Illustration' : 'Branding',
    categoryLabelEn: raw.category === 'ux-ui' ? 'UX · UI' : raw.category === 'illustration' ? 'Illustration' : 'Branding',
    title: raw.title ?? '',
    titleEn: raw.titleEn ?? raw.title ?? '',
    year: raw.year ?? '',
    desc: raw.title ?? '',
    descEn: raw.titleEn ?? raw.title ?? '',
    body: extractBody(raw.body),
    bodyEn: extractBody(raw.bodyEn),
    cover: raw.cover ? urlFor(raw.cover).width(1600).url() : undefined,
    coverPosition: raw.coverPosition,
    images: raw.images?.map((img: any) => urlFor(img).width(1600).url()) ?? [],
    externalLink: raw.externalLink,
  }
}

const slugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title, titleEn,
  "slug": slug.current,
  category, year,
  body, bodyEn,
  cover, coverPosition,
  images,
  externalLink,
  sortOrder,
}`

const allQuery = groq`*[_type == "project"] | order(sortOrder asc){
  title, titleEn,
  "slug": slug.current,
  category, year,
  cover, coverPosition,
  sortOrder,
}`

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await sanityClient.fetch(slugQuery, { slug }, { next: { revalidate: 60 } })
    if (raw) return fromSanity(raw)
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
