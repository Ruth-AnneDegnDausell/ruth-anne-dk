import { Suspense } from 'react'
import { getIllustrationerGallery } from '@/lib/data'
import { IllustrationerContent } from './_client'

export default async function IllustrationerPage() {
  const gallery = await getIllustrationerGallery()
  return (
    <Suspense>
      <IllustrationerContent gallery={gallery} />
    </Suspense>
  )
}
