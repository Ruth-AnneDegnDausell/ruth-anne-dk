'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/lang-context'
import { cn } from '@/lib/utils'

export default function OmMigLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { lang } = useLang()

  const tabs = [
    { da: 'Privat', en: 'Personal', href: '/om-mig/privat' },
    { da: 'Arbejde', en: 'Work', href: '/om-mig/arbejde' },
  ]

  return (
    <main className="px-8 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {lang === 'en' ? 'About' : 'Om mig'}
        </p>
        <h1 className="mb-8 text-[13px] font-[450] tracking-tight text-text">
          Ruth-Anne Dausell
        </h1>

        <div className="flex gap-6 border-b border-border">
          {tabs.map((tab) => {
            const active = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  '-mb-px pb-3 text-[11px] transition-colors duration-150',
                  active
                    ? 'border-b border-text text-text'
                    : 'text-text-3 hover:text-text-2'
                )}
              >
                {lang === 'en' ? tab.en : tab.da}
              </Link>
            )
          })}
        </div>
      </div>

      {children}
    </main>
  )
}
