'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
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
  da: { label: 'Fotografier', heading: 'Fotografier', intro: 'Analog og digital fotografering. Hverdagsbilleder, natur og øjeblikke.' },
  en: { label: 'Photography', heading: 'Photography', intro: 'Analogue and digital photography. Everyday images, nature, and moments.' },
}

export default function FotografierPage() {
  const { lang } = useLang()
  const t = T[lang]
  const [active, setActive] = useState('alle')

  const filtered = active === 'alle'
    ? FOTOGRAFIER
    : FOTOGRAFIER.filter((item) => item.category === active)

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">
          {t.heading}
        </h1>
        <p className="mb-7 text-[12px]/[1.85] text-text-2">{t.intro}</p>

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
