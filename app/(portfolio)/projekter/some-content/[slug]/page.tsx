'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { SOME_PROJECTS } from '@/lib/some-content'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: { back: 'SoMe Content', prev: 'Forrige', next: 'Næste', links: 'Links' },
  en: { back: 'Social Media Content', prev: 'Previous', next: 'Next', links: 'Links' },
}

export default function SomeProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const t = T[lang]

  const idx = SOME_PROJECTS.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()

  const project = SOME_PROJECTS[idx]
  const prev = SOME_PROJECTS[idx - 1] ?? null
  const next = SOME_PROJECTS[idx + 1] ?? null

  const title = lang === 'en' ? project.titleEn : project.title
  const body = lang === 'en' ? project.bodyEn : project.body

  return (
    <main className="min-h-screen px-8 pt-14 sm:px-14">

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
        <Link href="/projekter/some-content" className="mb-10 inline-flex items-center gap-1.5 text-[11px] text-text-3 transition-colors duration-150 hover:text-text">
          <ArrowLeft size={11} strokeWidth={1.5} />
          {t.back}
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05, ease }} className="mb-12">
        <p className="mb-3 text-[9px] tracking-[0.18em] uppercase text-text-3">
          {project.platforms.join(' · ')} · {project.year}
        </p>
        <h1 className="text-[clamp(0.9rem,1.3vw,1.05rem)]/[1.2] font-[300] tracking-tight text-text">{title}</h1>
      </motion.div>

      {project.cover && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-[oklch(91%_0_0)]">
          <Image src={project.cover} alt={title} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 900px" priority />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease }} className="mb-14 max-w-xl">
        {body.map((p, i) => (
          <p key={i} className={`text-[12px]/[1.85] text-text-2 ${i > 0 ? 'mt-5' : ''}`}>{p}</p>
        ))}
      </motion.div>

      {(project.videoEmbeds?.length ?? 0) > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.18, ease }} className="mb-14 space-y-4">
          {project.videoEmbeds!.map((embed, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-2xl bg-[oklch(91%_0_0)]">
              <iframe src={embed} title={`${title} video ${i + 1}`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ border: 'none' }} />
            </div>
          ))}
        </motion.div>
      )}

      {(project.images?.length ?? 0) > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2, ease }} className="mb-14 columns-2 gap-4 sm:columns-3">
          {project.images!.map((src, i) => (
            <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-[oklch(91%_0_0)]">
              <Image src={src} alt={`${title} ${i + 1}`} width={800} height={800} className="h-auto w-full" sizes="(max-width: 640px) 50vw, 33vw" />
            </div>
          ))}
        </motion.div>
      )}

      {(project.externalLinks?.length ?? 0) > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22, ease }} className="mb-14">
          <p className="mb-4 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.links}</p>
          <ul className="space-y-2">
            {project.externalLinks!.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] text-text-2 transition-opacity duration-150 hover:opacity-50">
                  {lang === 'en' ? l.labelEn : l.label}
                  <ExternalLink size={10} strokeWidth={1.5} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="pt-8">
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <Link href={`/projekter/some-content/${prev.slug}`} className="group flex items-center gap-2 text-[11px] text-text-2 transition-colors duration-150 hover:text-text">
              <ArrowLeft size={11} strokeWidth={1.5} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
              <span className="max-w-[180px] truncate">{lang === 'en' ? prev.titleEn : prev.title}</span>
            </Link>
          ) : <span />}
          <Link href="/projekter/some-content" className="text-[9px] tracking-[0.14em] uppercase text-text-3 transition-colors duration-150 hover:text-text">···</Link>
          {next ? (
            <Link href={`/projekter/some-content/${next.slug}`} className="group flex items-center gap-2 text-right text-[11px] text-text-2 transition-colors duration-150 hover:text-text">
              <span className="max-w-[180px] truncate">{lang === 'en' ? next.titleEn : next.title}</span>
              <ArrowRight size={11} strokeWidth={1.5} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          ) : <span />}
        </div>
      </div>

    </main>
  )
}
