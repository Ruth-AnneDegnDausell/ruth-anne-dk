'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Lang = 'da' | 'en'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const Ctx = createContext<LangCtx>({ lang: 'da', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('da')

  useEffect(() => {
    const saved = localStorage.getItem('site-lang') as Lang | null
    if (saved === 'en') setLang('en')
  }, [])

  const update = (l: Lang) => {
    setLang(l)
    localStorage.setItem('site-lang', l)
  }

  return <Ctx.Provider value={{ lang, setLang: update }}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
