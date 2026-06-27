'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useLang } from '@/lib/lang-context'
import { VIDEOS } from '@/lib/videos'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: {
    label: 'Projekter',
    heading: 'Video',
    intro: 'Videoproduktioner og motion content. Kortfilm, kampagnevideo og reklamecontent.',
    empty: 'Videoer er på vej.',
  },
  en: {
    label: 'Projects',
    heading: 'Video',
    intro: 'Video productions and motion content. Short films, campaign videos, and advertising content.',
    empty: 'Videos coming soon.',
  },
}

export default function VideoPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mb-12"
      >
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
        <p className="text-[12px]/[1.85] text-text-2">{t.intro}</p>
      </motion.div>

      {VIDEOS.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface"
            >
              <Play strokeWidth={1} size={22} className="text-text-3" />
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={v.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-video overflow-hidden rounded-t-2xl bg-[oklch(91%_0_0)]">
                <iframe
                  src={v.embed}
                  title={lang === 'en' ? v.titleEn : v.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
              <div className="px-4 py-4">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {v.client} · {v.year}
                </p>
                <p className="mt-1.5 text-[12px]/[1.4] font-[430] text-text">
                  {lang === 'en' ? v.titleEn : v.title}
                </p>
                <p className="mt-2 text-[11px]/[1.65] text-text-2">
                  {lang === 'en' ? v.descEn : v.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  )
}
