import { getAboutPrivat } from '@/lib/data'
import { PrivatClient } from './_client'

export default async function PrivatPage() {
  const sanityData = await getAboutPrivat()
  return <PrivatClient sanityData={sanityData} />
}
