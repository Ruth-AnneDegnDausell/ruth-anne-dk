'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import type { Project } from '@/lib/projects'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const CATEGORIES = {
  da: [
    { id: 'alle', label: 'Alle' },
    { id: 'branding', label: 'Branding' },
    { id: 'illustration', label: 'Illustration' },
    { id: 'ux-ui', label: 'UX · UI' },
  ],
  en: [
    { id: 'alle', label: 'All' },
    { id: 'branding', label: 'Branding' },
    { id: 'illustration', label: 'Illustration' },
    { id: 'ux-ui', label: 'UX · UI' },
  ],
}

const T = {
  da: { label: 'Arbejder', heading: 'Udvalgte projekter' },
  en: { label: 'Work', heading: 'Selected projects' },
}

export function ProjekterClient({ projects }: { projects: Project[] }) {
  const { lang } = useLang()
  const t = T[lang]
  const cats = CATEGORIES[lang]
  const [active, setActive] = useState('alle')

  const filtered =
    active === 'alle'
      ? projects
      : projects.filter(p => p.category === active)

  return (
    <main className="min-h-screen px-8 pb-20 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-3 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{t.label}</p>
        <h1 className="mb-8 text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>

        <div className="flex flex-wrap gap-1.5">
          {cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={
                active === cat.id
                  ? 'rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-surface transition-colors duration-150'
                  : 'rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text'
              }
            >
              {cat.label}
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
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <motion.a
              key={project.slug}
              href={`/projekter/${project.slug}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {(project.coverThumb ?? project.cover) ? (
                  <Image
                    src={project.coverThumb ?? project.cover!}
                    alt={lang === 'en' ? project.titleEn : project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={project.coverThumb ? undefined : { objectPosition: project.coverPosition ?? '50% 0%' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-[oklch(91%_0_0)] transition-transform duration-500 group-hover:scale-[1.03]" />
                )}
              </div>
              <div className="px-4 py-4">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {lang === 'en' ? project.categoryLabelEn : project.categoryLabel} · {project.year}
                </p>
                <p className="mt-1.5 text-[12px]/[1.4] font-[430] text-text">
                  {lang === 'en' ? project.titleEn : project.title}
                </p>
                {(lang === 'en' ? project.descEn : project.desc) && (
                  <p className="mt-2 text-[11px]/[1.65] text-text-2">
                    {lang === 'en' ? project.descEn : project.desc}
                  </p>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}
