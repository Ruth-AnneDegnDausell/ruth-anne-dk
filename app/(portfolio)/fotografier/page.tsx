import { Suspense } from 'react'
import { getFotografier } from '@/lib/data'
import { FotografierContent } from './_client'

export default async function FotografierPage() {
  const items = await getFotografier()
  return (
    <Suspense>
      <FotografierContent items={items} />
    </Suspense>
  )
}
