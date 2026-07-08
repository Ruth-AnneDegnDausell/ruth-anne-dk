import { getOrdningen } from '@/lib/data'
import { OrdningenClient } from './_client'

export default async function OrdningenPage() {
  const sanityData = await getOrdningen()
  return <OrdningenClient sanityData={sanityData} />
}
