import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects } from '@/lib/data'
import { ProjectClient } from './_client'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getAllProjects(),
  ])

  if (!project) notFound()

  const idx = allProjects.findIndex(p => p.slug === slug)
  const prev = allProjects[idx - 1] ?? null
  const next = allProjects[idx + 1] ?? null

  return <ProjectClient project={project} prev={prev} next={next} />
}
