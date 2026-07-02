import { Suspense } from 'react'
import { getFotografierGallery } from '@/lib/data'
import { FotografierContent } from './_client'

export default async function FotografierPage() {
  const gallery = await getFotografierGallery()
  return (
    <Suspense>
      <FotografierContent gallery={gallery} />
    </Suspense>
  )
}
