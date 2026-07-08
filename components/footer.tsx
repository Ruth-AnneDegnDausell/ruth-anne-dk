'use client'

import { useLang } from '@/lib/lang-context'

const T = {
  da: {
    built: 'Designet og kodet af Ruth-Anne Dausell',
    stack: 'Next.js · Supabase · Claude Code · GitHub · Vercel',
    contact: 'Kontakt',
  },
  en: {
    built: 'Designed and coded by Ruth-Anne Dausell',
    stack: 'Next.js · Supabase · Claude Code · GitHub · Vercel',
    contact: 'Contact',
  },
}

export function Footer() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <footer className="border-t border-border px-8 py-6 sm:px-14">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-text-3">© Ruth-Anne Dausell</p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/ruthannedausell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-text-3 transition-colors duration-150 hover:text-wine"
          >
            Instagram ↗
          </a>
          <a href="/cv" className="text-[10px] text-text-3 transition-colors duration-150 hover:text-wine">CV</a>
          <a href="/kontakt" className="text-[10px] text-text-3 transition-colors duration-150 hover:text-wine">{t.contact}</a>
        </div>
      </div>
      <p className="mt-3 text-[9px] text-text-3">
        {t.built} · {t.stack}
      </p>
    </footer>
  )
}
