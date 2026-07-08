import { getFeaturedProjects, getForside } from '@/lib/data'
import { PROJECTS } from '@/lib/projects'
import { HomeClient } from './_home-client'

export default async function Home() {
  const [forside, featuredProjects] = await Promise.all([getForside(), getFeaturedProjects()])

  // Fallback: hvis Sanity er tom, brug statisk data
  const featured = featuredProjects.length
    ? featuredProjects.slice(0, 3)
    : PROJECTS.filter(p => p.featured).slice(0, 3)

  return <HomeClient featured={featured} forside={forside} />
}
