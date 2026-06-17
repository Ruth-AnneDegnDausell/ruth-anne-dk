'use client'

import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PROJECTS } from '@/lib/projects'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: { back: 'Alle projekter', prev: 'Forrige', next: 'Næste' },
  en: { back: 'All projects', prev: 'Previous', next: 'Next' },
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const t = T[lang]

  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()

  const project = PROJECTS[idx]
  const prev = PROJECTS[idx - 1] ?? null
  const next = PROJECTS[idx + 1] ?? null

  const title = lang === 'en' ? project.titleEn : project.title
  const categoryLabel = lang === 'en' ? project.categoryLabelEn : project.categoryLabel
  const body = lang === 'en' ? project.bodyEn : project.body

  return (
    <main className="min-h-screen px-8 pb-28 pt-10 sm:px-14">

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
      >
        <Link
          href="/projekter"
          className="mb-10 inline-flex items-center gap-1.5 text-[11px] text-text-3 transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          {t.back}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease }}
        className="mb-12"
      >
        <p className="mb-3 text-[9px] tracking-[0.18em] uppercase text-text-3">
          {categoryLabel} · {project.year}
        </p>
        <h1 className="text-[clamp(0.9rem,1.3vw,1.05rem)]/[1.2] font-[300] tracking-tight text-text">
          {title}
        </h1>
      </motion.div>

      {/* Hero image placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl border border-dashed border-border-2 bg-surface"
      />

      {/* Body text */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        className="mb-14 max-w-xl"
      >
        {body.map((paragraph, i) => (
          <p key={i} className={`text-[12px]/[1.85] text-text-2 ${i > 0 ? 'mt-5' : ''}`}>
            {paragraph}
          </p>
        ))}
      </motion.div>

      {/* Image gallery placeholders */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
        className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-xl border border-dashed border-border-2 bg-surface"
          />
        ))}
      </motion.div>

      {/* Prev / Next navigation */}
      <div className="border-t border-border pt-8">
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/projekter/${prev.slug}`}
              className="group flex items-center gap-2 text-[11px] text-text-2 transition-colors duration-150 hover:text-text"
            >
              <ArrowLeft size={11} strokeWidth={1.5} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
              <span className="max-w-[180px] truncate">
                {lang === 'en' ? prev.titleEn : prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          <Link
            href="/projekter"
            className="text-[9px] tracking-[0.14em] uppercase text-text-3 transition-colors duration-150 hover:text-text"
          >
            ···
          </Link>

          {next ? (
            <Link
              href={`/projekter/${next.slug}`}
              className="group flex items-center gap-2 text-right text-[11px] text-text-2 transition-colors duration-150 hover:text-text"
            >
              <span className="max-w-[180px] truncate">
                {lang === 'en' ? next.titleEn : next.title}
              </span>
              <ArrowRight size={11} strokeWidth={1.5} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>

    </main>
  )
}
