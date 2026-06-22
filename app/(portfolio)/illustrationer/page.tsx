'use client'

import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: {
    label: 'Illustrationer',
    heading: 'Tegninger og illustrationer',
    intro: 'Et udvalg af illustrationer, skitser og tegninger fra projekter og fritid.',
  },
  en: {
    label: 'Illustrations',
    heading: 'Drawings and illustrations',
    intro: 'A selection of illustrations, sketches, and drawings from projects and spare time.',
  },
}

const ITEMS = [
  { id: 1, cols: 'col-span-1', aspect: 'aspect-[3/4]' },
  { id: 2, cols: 'col-span-1', aspect: 'aspect-[3/4]' },
  { id: 3, cols: 'col-span-1', aspect: 'aspect-square' },
  { id: 4, cols: 'col-span-1', aspect: 'aspect-[2/3]' },
  { id: 5, cols: 'col-span-1', aspect: 'aspect-[3/4]' },
  { id: 6, cols: 'col-span-1', aspect: 'aspect-square' },
  { id: 7, cols: 'col-span-1', aspect: 'aspect-[2/3]' },
  { id: 8, cols: 'col-span-1', aspect: 'aspect-[3/4]' },
]

export default function IllustrationerPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">
      <div className="mb-10">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">
          {t.heading}
        </h1>
        <p className="text-[12px]/[1.85] text-text-2">{t.intro}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="columns-2 gap-3 sm:columns-3"
      >
        {ITEMS.map((item, i) => (
          <div key={item.id} className="mb-3 break-inside-avoid">
            <div
              className={`${item.aspect} w-full overflow-hidden rounded-xl bg-[oklch(91%_0_0)] flex items-center justify-center transition-opacity duration-200 hover:opacity-80`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <ImageIcon strokeWidth={1} size={18} className="text-text-3" />
            </div>
          </div>
        ))}
      </motion.div>
    </main>
  )
}
