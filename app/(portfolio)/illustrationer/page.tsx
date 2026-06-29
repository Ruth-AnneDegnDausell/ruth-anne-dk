import { Suspense } from 'react'
import { getIllustrationer } from '@/lib/data'
import { IllustrationerContent } from './_client'

export default async function IllustrationerPage() {
  const items = await getIllustrationer()
  return (
    <Suspense>
      <IllustrationerContent items={items} />
    </Suspense>
  )
}
