export interface GalleryItem {
  src?: string
  aspect: string
  alt?: string
}

export const ILLUSTRATIONER: GalleryItem[] = [
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[2/3]' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[2/3]' },
  { aspect: 'aspect-[3/4]' },
]

export const FOTOGRAFIER: GalleryItem[] = [
  { aspect: 'aspect-[4/3]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-[4/3]' },
  { aspect: 'aspect-[4/3]' },
  { aspect: 'aspect-[3/4]' },
  { aspect: 'aspect-square' },
  { aspect: 'aspect-[4/3]' },
  { aspect: 'aspect-[3/4]' },
]
