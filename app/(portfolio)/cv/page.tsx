import { getCV } from '@/lib/data'
import { CVClient } from './_client'

export default async function CVPage() {
  const sanityData = await getCV()
  return <CVClient sanityData={sanityData} />
}
