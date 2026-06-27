export interface SomeProject {
  id: number
  slug: string
  title: string
  titleEn: string
  year: string
  client: string
  platforms: string[]
  desc: string
  descEn: string
  cover?: string
  images?: string[]
  videoEmbeds?: string[]
  externalLinks?: { label: string; labelEn: string; href: string }[]
  body: string[]
  bodyEn: string[]
}

export const SOME_PROJECTS: SomeProject[] = []
