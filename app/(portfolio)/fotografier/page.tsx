'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { FOTOGRAFIER } from '@/lib/gallery'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const CATS = [
  { id: 'alle',          da: 'Alle',                en: 'All' },
  { id: 'velomore',      da: 'VeloMore',            en: 'VeloMore' },
  { id: 'booklab',       da: 'BookLab',             en: 'BookLab' },
  { id: 'flaneur',       da: 'Flâneur',             en: 'Flâneur' },
  { id: 'konfirmation',  da: 'Konfirmation',        en: 'Confirmation' },
  { id: 'personlig',     da: 'Personlige projekter', en: 'Personal projects' },
]

const T = {
  da: { label: 'Fotografier', heading: 'Fotografier', intro: 'Analog og digital fotografering. Hverdagsbilleder, natur og øjeblikke.', aiLink: 'Se AI-genererede fotografier →' },
  en: { label: 'Photography', heading: 'Photography', intro: 'Analogue and digital photography. Everyday images, nature, and moments.', aiLink: 'See AI-generated photographs →' },
}

const PROJECT_LINKS: Record<string, { da: string; en: string; href: string }> = {
  flaneur:  { da: 'Se Flâneur projektet →',  en: 'See Flâneur project →',  href: '/projekter/flaneur' },
  velomore: { da: 'Se VeloMore projektet →', en: 'See VeloMore project →', href: '/projekter/velo-magazine' },
  booklab:  { da: 'Se BookLab projektet →',  en: 'See BookLab project →',  href: '/projekter/booklab' },
}

function FotografierContent() {
  const { lang } = useLang()
  const t = T[lang]
  const searchParams = useSearchParams()
  const [active, setActive] = useState(() => {
    const cat = searchParams.get('cat')
    return CATS.some(c => c.id === cat) ? cat! : 'alle'
  })

  const filtered = active === 'alle'
    ? FOTOGRAFIER
    : FOTOGRAFIER.filter((item) => {
        if (!item.category) return false
        if (Array.isArray(item.category)) return item.category.includes(active)
        return item.category === active
      })

  return (
    <main className="min-h-screen px-8 pt-14 sm:px-14">
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">
          {t.heading}
        </h1>
        <p className="mb-3 text-[12px]/[1.85] text-text-2">{t.intro}</p>
        <Link
          href="/ai"
          className="mb-7 inline-flex items-center text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
        >
          {t.aiLink}
        </Link>

        <div className="flex flex-wrap gap-1.5">
          {CATS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={
                active === cat.id
                  ? 'rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-surface transition-colors duration-150'
                  : 'rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text'
              }
            >
              {lang === 'en' ? cat.en : cat.da}
            </button>
          ))}
        </div>

        {PROJECT_LINKS[active] && (
          <div className="mt-3">
            <Link
              href={PROJECT_LINKS[active].href}
              className="text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
            >
              {lang === 'en' ? PROJECT_LINKS[active].en : PROJECT_LINKS[active].da}
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25, ease }}
          className="columns-2 gap-3 sm:columns-3"
        >
          {filtered.map((item, i) => (
            item.src ? (
              <div key={i} className="mb-3 break-inside-avoid overflow-hidden rounded-xl bg-[oklch(91%_0_0)]">
                <Image
                  src={item.src}
                  alt={item.alt ?? ''}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="h-auto w-full block transition-transform duration-500 hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            ) : null
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

export default function FotografierPage() {
  return (
    <Suspense>
      <FotografierContent />
    </Suspense>
  )
}
