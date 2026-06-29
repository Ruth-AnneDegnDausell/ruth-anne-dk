import { getFleksjob } from '@/lib/data'
import { FleksjobClient } from './_client'

export default async function FleksjobPage() {
  const sanityData = await getFleksjob()
  return <FleksjobClient sanityData={sanityData} />
}
