import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getAllProjects } from '@/lib/data'
import { ProjectClient } from './_client'

// Delt projektlink viser projektets titel, beskrivelse og forsidebillede
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  const image = project.coverThumb ?? project.cover
  return {
    title: project.title,
    description: project.body?.[0]?.slice(0, 160) ?? project.desc,
    openGraph: {
      title: project.title,
      description: project.body?.[0]?.slice(0, 160) ?? project.desc,
      images: image ? [{ url: image, width: 800, height: 600, alt: project.title }] : undefined,
    },
  }
}

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
