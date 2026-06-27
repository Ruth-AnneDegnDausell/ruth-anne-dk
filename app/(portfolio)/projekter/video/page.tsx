'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

type VideoEntry = {
  src: string
  title: string
  titleEn: string
  client: string
  slug: string
}

const VIDEOS: VideoEntry[] = [
  {
    src: '/projekter/SUHN io/Video design Suhn IO_final.mp4',
    title: 'SUHN IO · Video design',
    titleEn: 'SUHN IO · Video design',
    client: 'SUHN IO',
    slug: 'suhn-io',
  },
  {
    src: '/projekter/SUHN io/Visuel præsentation SUHN IO (1).mp4',
    title: 'SUHN IO · Visuel præsentation',
    titleEn: 'SUHN IO · Visual presentation',
    client: 'SUHN IO',
    slug: 'suhn-io',
  },
  {
    src: '/projekter/Substrate/Færdig Mobile Video.mp4',
    title: 'Substrate · Mobile video',
    titleEn: 'Substrate · Mobile video',
    client: 'Substrate',
    slug: 'substrate',
  },
  {
    src: '/projekter/BookLab/download.mp4',
    title: 'BookLab · Bogfotografering',
    titleEn: 'BookLab · Book photography',
    client: 'BookLab',
    slug: 'booklab',
  },
  {
    src: '/projekter/piba/Video design.mp4',
    title: 'PIBA · Video design',
    titleEn: 'PIBA · Video design',
    client: 'PIBA',
    slug: 'piba',
  },
]

const T = {
  da: {
    label: 'Projekter',
    heading: 'Video',
    intro: 'Videoproduktioner og motion content. Kortfilm, kampagnevideo og reklamecontent.',
    seeProject: 'Se',
    project: 'projekt',
  },
  en: {
    label: 'Projects',
    heading: 'Video',
    intro: 'Video productions and motion content. Short films, campaign videos, and advertising content.',
    seeProject: 'See',
    project: 'project',
  },
}

function VideoCard({ video, lang }: { video: VideoEntry; lang: 'da' | 'en' }) {
  const t = T[lang]
  const ref = useRef<HTMLVideoElement>(null)
  const [pinned, setPinned] = useState(false)

  const handleMouseEnter = useCallback(() => {
    if (!pinned) ref.current?.play().catch(() => {})
  }, [pinned])

  const handleMouseLeave = useCallback(() => {
    if (!pinned && ref.current) {
      ref.current.pause()
      ref.current.currentTime = 0
    }
  }, [pinned])

  const handleClick = useCallback(() => {
    const video = ref.current
    if (!video) return
    if (pinned) {
      setPinned(false)
      video.pause()
      video.currentTime = 0
    } else {
      setPinned(true)
      video.play().catch(() => {})
    }
  }, [pinned])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-[oklch(91%_0_0)]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ aspectRatio: '16/9' }}
      >
        <video
          ref={ref}
          src={encodeURI(video.src)}
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[11px] font-[430] text-text">
          {lang === 'en' ? video.titleEn : video.title}
        </p>
        <Link
          href={`/projekter/${video.slug}`}
          className="shrink-0 text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
        >
          {t.seeProject} {video.client} {t.project} →
        </Link>
      </div>
    </motion.div>
  )
}

export default function VideoPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pt-14 sm:px-14">
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

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video, i) => (
          <VideoCard key={i} video={video} lang={lang} />
        ))}
      </div>
    </main>
  )
}
