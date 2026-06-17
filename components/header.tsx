'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export function Header() {
  const { lang, setLang } = useLang()

  return (
    <header className="fixed left-12 right-0 top-0 z-[197] flex h-10 items-center justify-between border-b border-border bg-surface/90 px-5 backdrop-blur-sm">
      <Link
        href="/"
        className="text-[11px] font-[500] tracking-[0.06em] text-text transition-opacity duration-150 hover:opacity-50"
      >
        Ruth-Anne
      </Link>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setLang('da')}
          className={`text-[9px] tracking-[0.14em] uppercase transition-colors duration-150 ${
            lang === 'da' ? 'text-text' : 'text-text-3 hover:text-text-2'
          }`}
        >
          DA
        </button>
        <span className="text-[9px] text-text-3">·</span>
        <button
          onClick={() => setLang('en')}
          className={`text-[9px] tracking-[0.14em] uppercase transition-colors duration-150 ${
            lang === 'en' ? 'text-text' : 'text-text-3 hover:text-text-2'
          }`}
        >
          EN
        </button>
      </div>
    </header>
  )
}
