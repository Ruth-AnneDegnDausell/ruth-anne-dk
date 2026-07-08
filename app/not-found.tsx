'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

const T = {
  da: {
    eyebrow: '404',
    heading: 'Siden findes ikke',
    body: 'Siden er måske flyttet, eller også er der en tastefejl i adressen.',
    home: 'Til forsiden →',
    projects: 'Se projekter →',
  },
  en: {
    eyebrow: '404',
    heading: 'Page not found',
    body: 'The page may have moved, or there may be a typo in the address.',
    home: 'Go to the front page →',
    projects: 'View projects →',
  },
}

export default function NotFound() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="flex min-h-[60vh] flex-col justify-center px-8 pt-14 sm:px-14">
      <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{t.eyebrow}</p>
      <h1 className="mb-3 text-[13px] font-[450] tracking-tight text-text">{t.heading}</h1>
      <p className="mb-8 max-w-sm text-[12px]/[1.85] text-text-2">{t.body}</p>
      <div className="flex flex-col gap-3">
        <Link href="/" className="w-fit text-[11px] font-medium text-text transition-opacity duration-150 hover:opacity-50">
          {t.home}
        </Link>
        <Link href="/projekter" className="w-fit text-[11px] text-text-2 transition-opacity duration-150 hover:opacity-50">
          {t.projects}
        </Link>
      </div>
    </main>
  )
}
