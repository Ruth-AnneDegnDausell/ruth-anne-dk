import { getKontakt } from '@/lib/data'
import { KontaktClient } from './_client'

export default async function KontaktPage() {
  const sanityData = await getKontakt()
  return <KontaktClient sanityData={sanityData} />
}
