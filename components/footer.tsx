'use client'

import { useLang } from '@/lib/lang-context'

const T = {
  da: {
    built: 'Designet og kodet af Ruth-Anne Dausell',
    stack: 'Next.js · Supabase · Claude Code · GitHub · Vercel',
  },
  en: {
    built: 'Designed and coded by Ruth-Anne Dausell',
    stack: 'Next.js · Supabase · Claude Code · GitHub · Vercel',
  },
}

export function Footer() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <footer className="border-t border-border px-8 py-5 sm:px-14">
      <p className="mb-3 text-[10px] text-text-3">{t.built}</p>
      <p className="text-[10px] text-text-3">{t.stack}</p>
    </footer>
  )
}
