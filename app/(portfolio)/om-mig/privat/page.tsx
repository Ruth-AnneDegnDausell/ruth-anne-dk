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
    intro: 'Jeg er 28 år og bor i Nye nord for Aarhus med min kæreste Malte. Her er roligt, der er vild natur og et dejligt fællesskab, og det passer os rigtig godt.',
    body1: 'En stor del af min fritid går med cykling. Jeg cykler gennemsnitligt ti timer om ugen og er en del af et internationalt hold, vi cykler på Zwift. Hver torsdag aften kører vi TTT (holdtidskørsel), og det er en af de ting, jeg ser allermest frem til i løbet af ugen. Tour de France og Giro d\'Italia ser Malte og jeg næsten altid sammen.',
    body2: 'Udover cyklingen tegner jeg, skriver digte og fotograferer, både analogt og digitalt. Jeg har altid lavet ting med hænderne, og det følger mig i det meste af det jeg gør. Til hverdag prioriterer jeg tid med familien, gåture i skoven og museumsbesøg.',
    inspLabel: 'Hvad der fylder i hverdagen',
    inspirations: [
      'Cykling: TTT med holdet på Zwift og Tour de France på tv',
      'Digte, tegninger og fotografering (analog + digital)',
      'Natur, ro og gode omgivelser i Nye',
      'Museumsdage, skovture og tid med Malte og familien',
    ],
    photoAlt: 'Billede af Ruth-Anne',
    photoHint: 'Personligt billede · min. 1200 × 900 px',
  },
  en: {
    intro: 'I\'m 28 and live in Nye, north of Aarhus, with my partner Malte. It\'s quiet here, the nature is wild, and the community is lovely, and it suits us well.',
    body1: 'A big part of my free time goes into cycling. I ride an average of ten hours a week and am part of an international team on Zwift. Every Thursday evening we race TTT (team time trial), and it\'s one of the things I look forward to most during the week. Malte and I watch Tour de France and Giro d\'Italia together almost without fail.',
    body2: 'Alongside cycling I draw, write poetry, and take photos, both analogue and digital. I\'ve always made things by hand, and that carries into most of what I do. Day to day I prioritise time with family, walks in the forest, and museum visits.',
    inspLabel: 'What fills my days',
    inspirations: [
      'Cycling: TTT with the team on Zwift and Tour de France on tv',
      'Poetry, drawing, and photography (analogue + digital)',
      'Nature, quiet, and good surroundings in Nye',
      'Museum days, forest walks, and time with Malte and family',
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
