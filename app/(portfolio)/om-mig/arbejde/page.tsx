import { getAboutArbejde } from '@/lib/data'
import { ArbejdeClient } from './_client'

export default async function ArbejdePage() {
  const sanityData = await getAboutArbejde()
  return <ArbejdeClient sanityData={sanityData} />
}
