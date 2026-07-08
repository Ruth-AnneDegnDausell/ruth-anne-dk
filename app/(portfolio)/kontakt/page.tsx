import { getKontakt, getCV } from '@/lib/data'
import { KontaktClient } from './_client'

export default async function KontaktPage() {
  const [sanityData, cv] = await Promise.all([getKontakt(), getCV()])
  return <KontaktClient sanityData={sanityData} cvPdfUrl={cv?.pdfUrl ?? null} />
}
