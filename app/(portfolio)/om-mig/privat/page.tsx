'use client'

import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const T = {
  da: {
    intro: 'Udenfor kontoret finder jeg inspiration i alt fra cykelture langs havnen til udstillinger og bogstaplen på natbordet. Det kreative og det personlige er svært at adskille.',
    body1: 'Jeg voksede op med tegnesager ved spisebordet og et stærkt drive for at lave ting med hænderne. Det præger stadig måden jeg arbejder på - med en kærlighed til det håndgjorte udtryk, hvad enten det er en penselstreg eller en illustreret detalje i et logo.',
    body2: 'Til hverdag bruger jeg meget tid på at gå rundt i København og lade mig inspirere af arkitektur, skiltning og de små ting man normalt ikke lægger mærke til. Det er ofte dér de bedste ideer opstår.',
    inspLabel: 'Hvad der inspirerer mig',
    inspirations: [
      'Skandinavisk natur og farvepaletter',
      'Håndværk, bogbinding og risografi',
      'Musik og koncertplakater fra 60erne og 70erne',
      'Cykelsport og det grafiske univers der omgiver det',
    ],
    photoAlt: 'Billede af Ruth-Anne',
    photoHint: 'Personligt billede · min. 1200 × 900 px',
  },
  en: {
    intro: 'Outside the studio I find inspiration everywhere — from bike rides along the harbour to exhibitions and the pile of books on my nightstand. The creative and the personal are hard to separate.',
    body1: 'I grew up with drawing supplies at the dinner table and a strong urge to make things by hand. That still shapes how I work — with a love of handcrafted expression, whether it\'s a brushstroke or an illustrated detail in a logo.',
    body2: 'Day to day I spend a lot of time wandering around Copenhagen, drawing inspiration from architecture, signage, and the small things most people walk past. That\'s usually where the best ideas come from.',
    inspLabel: 'What inspires me',
    inspirations: [
      'Scandinavian nature and colour palettes',
      'Craft, bookbinding, and risography',
      'Music and concert posters from the 60s and 70s',
      'Cycling and the graphic world that surrounds it',
    ],
    photoAlt: 'Photo of Ruth-Anne',
    photoHint: 'Personal photo · min. 1200 × 900 px',
  },
}

export default function Privat() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

      {/* ─── Left: text ───────────────────────────────────── */}
      <div>
        <motion.p
          {...fadeUp(0)}
          className="mb-8 max-w-sm text-[13px]/[1.65] font-[300] tracking-tight text-text"
        >
          {t.intro}
        </motion.p>

        <motion.div {...fadeUp(0.06)} className="mb-8 max-w-sm space-y-4">
          <p className="text-[12px]/[1.85] text-text-2">{t.body1}</p>
          <p className="text-[12px]/[1.85] text-text-2">{t.body2}</p>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <p className="mb-4 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
            {t.inspLabel}
          </p>
          <ul className="space-y-2">
            {t.inspirations.map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[11px] text-text-2">
                <span className="h-px w-4 shrink-0 bg-border-2" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ─── Right: photo ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.08, ease }}
        className="flex flex-col gap-4"
      >
        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-[oklch(91%_0_0)] text-center">
          <ImageIcon strokeWidth={1} size={22} className="text-text-3" />
          <div>
            <p className="text-[11px] font-[450] text-text-2">{t.photoAlt}</p>
            <p className="mt-0.5 text-[10px] text-text-3">{t.photoHint}</p>
          </div>
        </div>

        {/* Second smaller photo */}
        <div className="flex aspect-[3/2] w-full items-center justify-center rounded-2xl bg-[oklch(93%_0_0)]">
          <ImageIcon strokeWidth={1} size={18} className="text-text-3" />
        </div>
      </motion.div>

    </div>
  )
}
