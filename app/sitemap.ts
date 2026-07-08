import type { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/data'

const BASE = 'https://ruth-anne.dk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/projekter',
    '/projekter/video',
    '/illustrationer',
    '/fotografier',
    '/ai',
    '/om-mig/privat',
    '/om-mig/arbejde',
    '/cv',
    '/cv/udtalelser',
    '/fleksjob',
    '/fleksjob/ordningen',
    '/kontakt',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }))

  const projects = await getAllProjects()
  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/projekter/${p.slug}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...projectRoutes]
}
