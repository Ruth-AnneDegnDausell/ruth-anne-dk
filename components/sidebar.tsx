'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  User,
  FolderOpen,
  Palette,
  FileText,
  Mail,
  PanelLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang-context'

type SubItem = { label: string; labelEn: string; href: string }
type NavItem = {
  label: string
  labelEn: string
  href: string
  icon: React.ReactNode
  sub?: SubItem[]
}

const NAV: NavItem[] = [
  { label: 'Hjem', labelEn: 'Home', href: '/', icon: <Home strokeWidth={1.5} size={16} /> },
  {
    label: 'Om mig',
    labelEn: 'About',
    href: '/om-mig/arbejde',
    icon: <User strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'Privat', labelEn: 'Personal', href: '/om-mig/privat' },
      { label: 'Arbejde', labelEn: 'Work', href: '/om-mig/arbejde' },
    ],
  },
  {
    label: 'Projekter',
    labelEn: 'Projects',
    href: '/projekter',
    icon: <FolderOpen strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'Branding', labelEn: 'Branding', href: '/projekter/branding' },
      { label: 'Illustration', labelEn: 'Illustration', href: '/projekter/illustration' },
      { label: 'UX · UI', labelEn: 'UX · UI', href: '/projekter/ux-ui' },
    ],
  },
  {
    label: 'Illustrationer',
    labelEn: 'Illustrations',
    href: '/illustrationer',
    icon: <Palette strokeWidth={1.5} size={16} />,
  },
  { label: 'CV', labelEn: 'CV', href: '/cv', icon: <FileText strokeWidth={1.5} size={16} /> },
  { label: 'Kontakt', labelEn: 'Contact', href: '/kontakt', icon: <Mail strokeWidth={1.5} size={16} /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const [panelOpen, setPanelOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const panelVisible = pinned || panelOpen

  useEffect(() => {
    setPinned(false)
    setPanelOpen(false)
    setActiveGroup(null)
  }, [pathname])

  const scheduleClose = useCallback(() => {
    if (pinned) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setPanelOpen(false)
      setActiveGroup(null)
    }, 220)
  }, [pinned])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const togglePin = () => {
    if (pinned) {
      setPinned(false)
      setPanelOpen(false)
      setActiveGroup(null)
    } else {
      setPinned(true)
      setPanelOpen(true)
    }
  }

  const closePanel = useCallback(() => {
    if (!pinned) {
      setPanelOpen(false)
      setActiveGroup(null)
    }
  }, [pinned])

  const getLabel = (item: NavItem | SubItem) =>
    lang === 'en' ? item.labelEn : item.label

  return (
    <>
      {/* ─── Icon rail — always visible ──────────────────────── */}
      <div
        className="fixed left-0 top-0 z-[199] flex h-full w-12 flex-col border-r border-border bg-surface/95 backdrop-blur-sm"
        onMouseEnter={() => { cancelClose(); setPanelOpen(true) }}
        onMouseLeave={scheduleClose}
      >
        {/* Panel toggle */}
        <button
          onClick={togglePin}
          title={pinned ? 'Luk sidebar' : 'Fastgør sidebar'}
          className={cn(
            'flex h-11 w-full shrink-0 items-center justify-center border-b border-border transition-colors duration-150',
            pinned ? 'text-text' : 'text-text-3 hover:text-text-2'
          )}
        >
          <PanelLeft strokeWidth={1.5} size={14} />
        </button>

        {/* Nav icons */}
        <nav className="flex flex-col gap-0.5 px-1.5 py-3">
          {NAV.map((item) => {
            const isActive = pathname === item.href ||
              (item.sub?.some((s) => pathname.startsWith(s.href)) ?? false)
            return (
              <Link
                key={item.label}
                href={item.href}
                title={getLabel(item)}
                className={cn(
                  'flex h-9 w-full items-center justify-center rounded-md transition-colors duration-150',
                  isActive ? 'text-text' : 'text-text-3 hover:text-text-2'
                )}
              >
                {item.icon}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* ─── Full panel ───────────────────────────────────────── */}
      <AnimatePresence>
        {panelVisible && (
          <motion.nav
            key="panel"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="fixed left-12 top-0 z-[199] flex h-full w-52 flex-col border-r border-border bg-surface/95 py-5 backdrop-blur-sm"
          >
            {/* Ruth-Anne home link */}
            <Link
              href="/"
              onClick={closePanel}
              className="mb-6 px-4 text-[10px] font-[500] tracking-[0.18em] uppercase text-text-2 transition-colors duration-150 hover:text-text"
            >
              Ruth-Anne
            </Link>

            {/* Nav items */}
            <ul className="flex flex-col gap-px px-2">
              {NAV.map((item) => {
                const isActive = pathname === item.href ||
                  (item.sub?.some((s) => pathname.startsWith(s.href)) ?? false)

                if (item.sub) {
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => setActiveGroup(item.label)}
                      onMouseLeave={() => setActiveGroup(null)}
                    >
                      {/* Group label is a real link */}
                      <Link
                        href={item.href}
                        onClick={closePanel}
                        className={cn(
                          'flex items-center gap-2.5 px-2 py-2 text-[13px]/5 transition-colors duration-150',
                          isActive ? 'text-text' : 'text-text-2 hover:text-text'
                        )}
                      >
                        {item.icon}
                        {getLabel(item)}
                      </Link>

                      <AnimatePresence>
                        {activeGroup === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            {item.sub.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  onClick={closePanel}
                                  className={cn(
                                    'block py-1.5 pl-9 pr-2 text-[12px] transition-colors duration-150',
                                    pathname === sub.href ? 'text-text' : 'text-text-2 hover:text-text'
                                  )}
                                >
                                  {getLabel(sub)}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={closePanel}
                      className={cn(
                        'flex items-center gap-2.5 px-2 py-2 text-[13px]/5 transition-colors duration-150',
                        isActive ? 'text-text' : 'text-text-2 hover:text-text'
                      )}
                    >
                      {item.icon}
                      {getLabel(item)}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Bottom: lang toggle + copyright */}
            <div className="mt-auto border-t border-border px-4 pt-4">
              <div className="mb-3 flex items-center gap-1.5">
                <button
                  onClick={() => setLang('da')}
                  className={cn(
                    'text-[9px] tracking-[0.14em] uppercase transition-colors duration-150',
                    lang === 'da' ? 'text-text' : 'text-text-3 hover:text-text-2'
                  )}
                >
                  DA
                </button>
                <span className="text-[9px] text-text-3">·</span>
                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    'text-[9px] tracking-[0.14em] uppercase transition-colors duration-150',
                    lang === 'en' ? 'text-text' : 'text-text-3 hover:text-text-2'
                  )}
                >
                  EN
                </button>
              </div>
              <p className="text-[10px] text-text-3">© Ruth-Anne Dausell</p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
