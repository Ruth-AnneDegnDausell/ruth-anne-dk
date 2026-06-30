import { getAllProjects } from '@/lib/data'
import { PROJECTS } from '@/lib/projects'
import { HomeClient } from './_home-client'

export default async function Home() {
  let projects = await getAllProjects()

  // Fallback: hvis Sanity er tom, brug statisk data
  if (!projects.length) projects = PROJECTS

  const featured = projects.filter(p => p.featured).slice(0, 3)

  return <HomeClient featured={featured} />
}
