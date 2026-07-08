'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'
import { ProjectVideo } from '@/components/project-video'

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
    src: '/projekter/Flaneur/flaneur-reklame-web.mp4',
    title: 'Flaneur · Reklamevideo',
    titleEn: 'Flaneur · Commercial',
    client: 'Flaneur',
    slug: 'flaneur',
  },
  {
    src: '/projekter/Flaneur/flaneur-video-web.mp4',
    title: 'Flaneur · Video',
    titleEn: 'Flaneur · Video',
    client: 'Flaneur',
    slug: 'flaneur',
  },
  {
    src: '/projekter/SUHN io/suhn-video-1-web.mp4',
    title: 'SUHN IO · Visuel præsentation 1',
    titleEn: 'SUHN IO · Visual presentation 1',
    client: 'SUHN IO',
    slug: 'suhn-io',
  },
  {
    src: '/projekter/SUHN io/suhn-video-2-web.mp4',
    title: 'SUHN IO · Visuel præsentation 2',
    titleEn: 'SUHN IO · Visual presentation 2',
    client: 'SUHN IO',
    slug: 'suhn-io',
  },
  {
    src: '/projekter/Substrate/substrate-video-web.mp4',
    title: 'Substrate · Mobile video',
    titleEn: 'Substrate · Mobile video',
    client: 'Substrate',
    slug: 'substrate',
  },
  {
    src: '/projekter/VeloMore Magazine/IMG_9487.mp4',
    title: 'VeloMore · Video',
    titleEn: 'VeloMore · Video',
    client: 'VeloMore',
    slug: 'velo-magazine',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <ProjectVideo
        src={video.src}
        className="aspect-[16/9] rounded-2xl border border-border"
      />
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
    <main className="px-8 pt-14 sm:px-14">
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
