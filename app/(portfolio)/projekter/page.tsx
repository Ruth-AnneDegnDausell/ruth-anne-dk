import { Suspense } from 'react'
import { getAllProjects } from '@/lib/data'
import { ProjekterClient } from './_client'

export default async function ProjekterPage() {
  const projects = await getAllProjects()
  return (
    <Suspense>
      <ProjekterClient projects={projects} />
    </Suspense>
  )
}
