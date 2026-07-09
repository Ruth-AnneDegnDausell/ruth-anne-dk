'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Suspense, useState } from 'react'
import { useLang } from '@/lib/lang-context'
import { ProjectVideo } from '@/components/project-video'
import { Lightbox } from '@/components/lightbox'
import { Reveal } from '@/components/reveal'
import type { Project } from '@/lib/projects'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const T = {
  da: { back: 'Alle projekter', backHome: 'Forside', backCv: 'CV', visitSite: 'Besøg website' },
  en: { back: 'All projects', backHome: 'Home', backCv: 'CV', visitSite: 'Visit website' },
}

function ProjectContent({ project, prev, next }: {
  project: Project
  prev: Project | null
  next: Project | null
}) {
  const searchParams = useSearchParams()
  const from = searchParams.get('from')
  const { lang } = useLang()
  const t = T[lang]

  const title = lang === 'en' ? project.titleEn : project.title
  const categoryLabel = lang === 'en' ? project.categoryLabelEn : project.categoryLabel
  const body = lang === 'en' ? (project.bodyEn?.length ? project.bodyEn : project.body) : project.body

  const backHref = from === 'home' ? '/' : from === 'cv' ? '/cv' : '/projekter'
  const backLabel = from === 'home' ? t.backHome : from === 'cv' ? t.backCv : t.back

  // Par af (vist billede, ubeskåret version) - coveret vises separat øverst
  const galleryPairs = (project.images ?? [])
    .map((src, i) => ({ src, full: project.imagesFull?.[i] ?? src }))
    .filter((p) => p.src !== project.cover)
  const galleryImages = galleryPairs.map((p) => p.src)

  // Projekter hvor videoerne ligger inde i selve galleriet i stedet for øverst
  const videosInGallery = ['piba', 'flaneur'].includes(project.slug)

  // Projekter med bredt cover der vises hotspot-beskåret i 4:3 (som på projektkortet)
  const cropCover = ['ramtt', 'aarhus-bornehojskole'].includes(project.slug)
  const coverSrc = cropCover ? (project.coverCropped ?? project.cover) : project.cover
  type GalleryEntry = { type: 'image'; src: string; imageIndex: number } | { type: 'video'; src: string }
  const galleryEntries: GalleryEntry[] = galleryImages.map((src, i) => ({ type: 'image', src, imageIndex: i }))
  if (videosInGallery && project.videos?.length) {
    // Fordel videoerne jævnt i galleriet
    project.videos.forEach((v, k) => {
      const pos = Math.min(
        galleryEntries.length,
        Math.round(((k + 1) / (project.videos!.length + 1)) * galleryEntries.length),
      )
      galleryEntries.splice(pos, 0, { type: 'video', src: v })
    })
  }
  // Coveret er nr. 1 i lightboxen, derefter galleriets billeder
  const lightboxItems = [
    ...(project.cover ? [{ src: project.cover, full: project.cover, aspect: '' }] : []),
    ...galleryPairs.map((p) => ({ src: p.src, full: p.full, aspect: '' })),
  ]
  const galleryOffset = project.cover ? 1 : 0
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <main className="overflow-x-clip pt-14">

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-6 flex flex-wrap items-center gap-5 px-8 sm:mb-10 sm:px-14"
      >
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[11px] text-text-3 transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          {backLabel}
        </Link>
        {backHref !== '/projekter' && (
          <Link
            href="/projekter"
            className="inline-flex items-center gap-1.5 text-[11px] text-text-3 transition-colors duration-150 hover:text-text"
          >
            <ArrowLeft size={11} strokeWidth={1.5} />
            {lang === 'en' ? 'All projects' : 'Se alle projekter'}
          </Link>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease }}
        className="mb-6 grid grid-cols-1 gap-6 px-8 sm:mb-16 sm:gap-10 sm:px-14 lg:grid-cols-[1fr_44%]"
      >
        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-3 text-[9px] tracking-[0.18em] uppercase text-text-3">
              {categoryLabel} · {project.year}
            </p>
            <h1 className="mb-7 text-[clamp(0.9rem,1.4vw,1.15rem)]/[1.25] font-[300] tracking-tight text-text">
              {title}
            </h1>
            <div className="max-w-lg space-y-5">
              {body.map((paragraph, i) => (
                <p key={i} className="text-[12px]/[1.85] text-text-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text transition-opacity duration-150 hover:opacity-50"
              >
                {t.visitSite}
                <ExternalLink size={11} strokeWidth={1.5} />
              </a>
            )}
            {project.testimonialRef && (
              <Link
                href={project.testimonialRef.href}
                className="text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
              >
                {lang === 'en' ? project.testimonialRef.labelEn : project.testimonialRef.label}
              </Link>
            )}
            {project.galleryLinks?.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
              >
                {lang === 'en' ? link.labelEn : link.label}
              </Link>
            ))}
          </div>
        </div>

        {project.cover && (
          <div
            onClick={() => setLightboxIndex(0)}
            className="cursor-zoom-in overflow-hidden rounded-2xl bg-[oklch(91%_0_0)]"
          >
            <Image
              src={coverSrc!}
              alt={title}
              width={0}
              height={0}
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="h-auto w-full"
              priority
            />
          </div>
        )}
      </motion.div>

      {!videosInGallery && (project.videos?.length ?? 0) > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="mb-10 flex flex-wrap items-start gap-4 px-8 sm:px-14"
        >
          {project.videos!.map((src, i) => (
            <ProjectVideo
              key={i}
              src={src}
              className="min-w-0 max-w-full"
              videoClassName="block h-auto w-auto max-w-full"
              sizeByOrientation
            />
          ))}
        </motion.div>
      )}

      {galleryEntries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
          className="mb-20 columns-2 gap-3 px-8 sm:px-14"
        >
          {galleryEntries.map((entry, i) =>
            entry.type === 'video' ? (
              <Reveal key={`v-${i}`} className="mb-3 break-inside-avoid">
                <ProjectVideo
                  src={entry.src}
                  videoClassName="block h-auto w-full"
                />
              </Reveal>
            ) : (
              <Reveal key={i} className="mb-3 break-inside-avoid">
              <div
                onClick={() => setLightboxIndex(entry.imageIndex + galleryOffset)}
                className="cursor-zoom-in overflow-hidden rounded-xl bg-[oklch(91%_0_0)]"
              >
                <Image
                  src={entry.src}
                  alt={`${title} ${entry.imageIndex + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 50vw, 40vw"
                  className="h-auto w-full block"
                  loading="lazy"
                />
              </div>
              </Reveal>
            )
          )}
        </motion.div>
      )}

      <Lightbox
        backLabel={lang === 'en' ? 'Back to the project' : 'Tilbage til projektet'}
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />

      <div className="px-8 pt-8 sm:px-14">
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
          ) : <span />}

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
          ) : <span />}
        </div>
      </div>

    </main>
  )
}

export function ProjectClient(props: { project: Project; prev: Project | null; next: Project | null }) {
  return (
    <Suspense>
      <ProjectContent {...props} />
    </Suspense>
  )
}
