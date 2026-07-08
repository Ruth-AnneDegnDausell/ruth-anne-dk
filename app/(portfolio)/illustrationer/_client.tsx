'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import type { GalleryData } from '@/lib/data'
import { Masonry, aspectRatioOf } from '@/components/masonry'
import { Lightbox } from '@/components/lightbox'
import { Reveal } from '@/components/reveal'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: { all: 'Alle', label: 'Illustrationer', heading: 'Tegninger og illustrationer', intro: 'Et udvalg af illustrationer, skitser og tegninger fra projekter og fritid.' },
  en: { all: 'All', label: 'Illustrations', heading: 'Drawings and illustrations', intro: 'A selection of illustrations, sketches, and drawings from projects and spare time.' },
}

const PROJECT_LINKS: Record<string, { da: string; en: string; href: string }> = {
  cykel:   { da: 'Se VeloMore projektet →',   en: 'See VeloMore project →',   href: '/projekter/velo-magazine' },
  vidsans: { da: 'Se Vid & Sans projektet →', en: 'See Vid & Sans project →', href: '/projekter/vid-sans' },
  kfum:    { da: 'Se KFUM&KFUK projektet →', en: 'See KFUM&KFUK project →', href: '/projekter/kfum-kfuk' },
}

export function IllustrationerContent({ gallery }: { gallery: GalleryData }) {
  const { lang } = useLang()
  const t = T[lang]
  const searchParams = useSearchParams()
  const [active, setActive] = useState(() => {
    const cat = searchParams.get('cat')
    return gallery.categories.some(c => c.id === cat) ? cat! : 'alle'
  })

  const filtered = active === 'alle' ? gallery.allItems : (gallery.byCategory[active] ?? [])
  const visible = filtered.filter((item) => item.src)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main className="px-8 pt-14 sm:px-14">
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{t.label}</p>
        <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
        <p className="mb-7 text-[12px]/[1.85] text-text-2">{t.intro}</p>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActive('alle')}
            className={
              active === 'alle'
                ? 'rounded-full bg-wine px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-butter transition-colors duration-150'
                : 'rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text'
            }
          >
            {t.all}
          </button>
          {gallery.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={
                active === cat.id
                  ? 'rounded-full bg-wine px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-butter transition-colors duration-150'
                  : 'rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text'
              }
            >
              {lang === 'en' ? cat.en : cat.da}
            </button>
          ))}
        </div>

        {PROJECT_LINKS[active] && (
          <div className="mt-3">
            <Link href={PROJECT_LINKS[active].href} className="text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50">
              {lang === 'en' ? PROJECT_LINKS[active].en : PROJECT_LINKS[active].da}
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease }}
        >
          <Masonry
            items={visible}
            ratio={(item) => aspectRatioOf(item.aspect)}
            render={(item, i) => (
              <Reveal key={i}>
              <div
                onClick={() => setLightboxIndex(i)}
                className={`relative cursor-zoom-in overflow-hidden rounded-xl bg-[oklch(91%_0_0)] ${item.aspect ?? ''}`}
              >
                <Image
                  src={item.src!}
                  alt={item.alt ?? ''}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              </Reveal>
            )}
          />
        </motion.div>
      </AnimatePresence>

      <Lightbox
        backLabel={lang === 'en' ? 'Back to illustrations' : 'Tilbage til illustrationer'}
        items={visible}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </main>
  )
}
