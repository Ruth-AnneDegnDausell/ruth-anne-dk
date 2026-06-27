export interface VideoItem {
  id: number
  slug: string
  title: string
  titleEn: string
  year: string
  client: string
  desc: string
  descEn: string
  embed: string
  thumbnail?: string
}

export const VIDEOS: VideoItem[] = []
