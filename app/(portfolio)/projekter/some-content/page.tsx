'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLang } from '@/lib/lang-context'
import { SOME_PROJECTS } from '@/lib/some-content'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: {
    label: 'Projekter',
    heading: 'SoMe Content',
    intro: 'Eksempler på content til sociale medier. Kampagner, billeder, video og strategi for en række brands.',
    empty: 'Projekter er på vej.',
  },
  en: {
    label: 'Projects',
    heading: 'Social Media Content',
    intro: 'Examples of content for social media. Campaigns, imagery, video, and strategy for a range of brands.',
    empty: 'Projects coming soon.',
  },
}

export default function SomeContentPage() {
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

      {SOME_PROJECTS.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="aspect-[4/3] bg-[oklch(91%_0_0)]" />
              <div className="px-4 py-4">
                <div className="mb-2 h-2 w-16 rounded-full bg-[oklch(91%_0_0)]" />
                <div className="h-3 w-32 rounded-full bg-[oklch(91%_0_0)]" />
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SOME_PROJECTS.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/projekter/some-content/${p.slug}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={lang === 'en' ? p.titleEn : p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-[oklch(91%_0_0)]" />
                )}
              </div>
              <div className="px-4 py-4">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {p.platforms.join(' · ')} · {p.year}
                </p>
                <p className="mt-1.5 text-[12px]/[1.4] font-[430] text-text">
                  {lang === 'en' ? p.titleEn : p.title}
                </p>
                <p className="mt-2 text-[11px]/[1.65] text-text-2">
                  {lang === 'en' ? p.descEn : p.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </main>
  )
}
