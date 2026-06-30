import { getAllProjects } from '@/lib/data'
import { ProjekterClient } from './_client'

export default async function ProjekterPage() {
  const projects = await getAllProjects()
  return <ProjekterClient projects={projects} />
}
