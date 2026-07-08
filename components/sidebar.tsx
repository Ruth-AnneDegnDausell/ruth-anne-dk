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
  Camera,
  FileText,
  Mail,
  PanelLeft,
  Heart,
  Play,
  Share2,
  Sparkles,
  Menu,
  X,
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
    href: '/om-mig/privat',
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
      { label: 'Alle projekter', labelEn: 'All projects', href: '/projekter' },
      { label: 'Video', labelEn: 'Video', href: '/projekter/video' },
      { label: 'AI Fotografier', labelEn: 'AI Photography', href: '/ai' },
    ],
  },
  {
    label: 'Illustrationer',
    labelEn: 'Illustrations',
    href: '/illustrationer',
    icon: <Palette strokeWidth={1.5} size={16} />,
  },
  {
    label: 'Fotografier',
    labelEn: 'Photography',
    href: '/fotografier',
    icon: <Camera strokeWidth={1.5} size={16} />,
  },
  {
    label: 'CV',
    labelEn: 'CV',
    href: '/cv',
    icon: <FileText strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'CV', labelEn: 'CV', href: '/cv' },
      { label: 'Udtalelser', labelEn: 'References', href: '/cv/udtalelser' },
    ],
  },
  {
    label: 'Fleksjob',
    labelEn: 'Flex job',
    href: '/fleksjob',
    icon: <Heart strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'Mit fleksjob', labelEn: 'My flex job', href: '/fleksjob' },
      { label: 'Generelt om fleksjob', labelEn: 'About flex jobs', href: '/fleksjob/ordningen' },
    ],
  },
  { label: 'Kontakt', labelEn: 'Contact', href: '/kontakt', icon: <Mail strokeWidth={1.5} size={16} /> },
]

const COLLAPSED = 48
const EXPANDED = 208

export function Sidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileNav />
    </>
  )
}

// ─── Mobil: topbjælke + fuldskærmsmenu (vises kun under 640px) ──────────────
function MobileNav() {
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  const getLabel = (item: NavItem | SubItem) => (lang === 'en' ? item.labelEn : item.label)

  // Luk menuen ved navigation og lås baggrundens scroll mens den er åben
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="sm:hidden">
      {/* Topbjælke */}
      <div className="fixed left-0 right-0 top-0 z-[199] flex h-11 items-center justify-between border-b border-border bg-surface/95 px-5 backdrop-blur-sm">
        <Link href="/" className="text-[10px] font-[500] tracking-[0.18em] uppercase text-text-2">
          Ruth-Anne
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Åbn menu" className="-mr-2 flex h-9 w-9 items-center justify-center text-text-2">
          <Menu strokeWidth={1.5} size={17} />
        </button>
      </div>

      {/* Fuldskærmsmenu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] flex flex-col bg-surface"
          >
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-border px-5">
              <Link href="/" onClick={() => setOpen(false)} className="text-[10px] font-[500] tracking-[0.18em] uppercase text-text-2">
                Ruth-Anne
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Luk menu" className="-mr-2 flex h-9 w-9 items-center justify-center text-text-2">
                <X strokeWidth={1.5} size={17} />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-5 py-6">
              {NAV.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.sub?.some((s) => pathname.startsWith(s.href)) ?? false)
                return (
                  <li key={item.label} className="mb-1">
                    {/* Almindeligt <a> så navigation altid virker på touch */}
                    <a
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 py-2.5 text-[14px]',
                        isActive ? 'text-text' : 'text-text-2'
                      )}
                    >
                      <span className="text-text-3">{item.icon}</span>
                      {getLabel(item)}
                    </a>
                    {item.sub && (
                      <ul className="mb-2 ml-[29px] border-l border-border pl-4">
                        {item.sub.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                'block py-2 text-[12px]',
                                pathname === sub.href ? 'text-text' : 'text-text-2'
                              )}
                            >
                              {getLabel(sub)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex shrink-0 items-center justify-between border-t border-border px-5 py-4">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLang('da')}
                  className={cn('text-[10px] tracking-[0.14em] uppercase', lang === 'da' ? 'text-text' : 'text-text-3')}
                >
                  DA
                </button>
                <span className="text-[10px] text-text-3">·</span>
                <button
                  onClick={() => setLang('en')}
                  className={cn('text-[10px] tracking-[0.14em] uppercase', lang === 'en' ? 'text-text' : 'text-text-3')}
                >
                  EN
                </button>
              </div>
              <p className="text-[10px] text-text-3">© Ruth-Anne Dausell</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopSidebar() {
  const pathname = usePathname()
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const expanded = pinned || open

  // Auto-collapse when navigating
  useEffect(() => {
    setPinned(false)
    setOpen(false)
    setActiveGroup(null)
  }, [pathname])

  const scheduleClose = useCallback(() => {
    if (pinned) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setActiveGroup(null)
    }, 220)
  }, [pinned])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const togglePin = () => {
    if (pinned) {
      setPinned(false)
      setOpen(false)
      setActiveGroup(null)
    } else {
      setPinned(true)
      setOpen(true)
    }
  }

  const close = useCallback(() => {
    if (!pinned) { setOpen(false); setActiveGroup(null) }
  }, [pinned])

  const getLabel = (item: NavItem | SubItem) => lang === 'en' ? item.labelEn : item.label

  // Labels fade in slightly after the sidebar starts opening
  const labelStyle = {
    opacity: expanded ? 1 : 0,
    transitionDelay: expanded ? '60ms' : '0ms',
  }

  return (
    <motion.nav
      className="fixed left-0 top-0 z-[199] hidden h-full flex-col overflow-hidden border-r border-border bg-surface/95 backdrop-blur-sm sm:flex"
      animate={{ width: expanded ? EXPANDED : COLLAPSED }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => { cancelClose(); setOpen(true) }}
      onMouseLeave={scheduleClose}
    >
      {/* ─── Top row: panel toggle + Ruth-Anne home link ───── */}
      <div className="flex h-11 shrink-0 items-center border-b border-border">
        <button
          onClick={togglePin}
          title={pinned ? 'Luk sidebar' : 'Fastgør sidebar'}
          className={cn(
            'flex h-full w-12 shrink-0 items-center justify-center transition-colors duration-150',
            pinned ? 'text-text' : 'text-text-3 hover:text-text-2'
          )}
        >
          <PanelLeft strokeWidth={1.5} size={14} />
        </button>
        <Link
          href="/"
          onClick={close}
          className="whitespace-nowrap text-[10px] font-[500] tracking-[0.18em] uppercase text-text-2 transition-colors duration-150 hover:text-wine"
          style={labelStyle}
        >
          Ruth-Anne
        </Link>
      </div>

      {/* ─── Nav items ────────────────────────────────────── */}
      <ul className="flex flex-col gap-px py-3">
        {NAV.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.sub?.some((s) => pathname.startsWith(s.href)) ?? false)

          if (item.sub) {
            return (
              <li
                key={item.label}
                onMouseEnter={() => setActiveGroup(item.label)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    'flex h-9 items-center gap-2.5 px-4 transition-colors duration-150',
                    isActive ? 'text-text' : 'text-text-2 hover:text-wine'
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span
                    className="whitespace-nowrap text-[13px]/none transition-opacity duration-150"
                    style={labelStyle}
                  >
                    {getLabel(item)}
                  </span>
                </Link>

                <AnimatePresence>
                  {activeGroup === item.label && expanded && (
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
                            onClick={close}
                            className={cn(
                              'block py-1.5 pl-[42px] pr-4 text-[12px] transition-colors duration-150',
                              pathname === sub.href ? 'text-text' : 'text-text-2 hover:text-wine'
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
                onClick={close}
                className={cn(
                  'flex h-9 items-center gap-2.5 px-4 transition-colors duration-150',
                  isActive ? 'text-text' : 'text-text-2 hover:text-wine'
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                <span
                  className="whitespace-nowrap text-[13px]/none transition-opacity duration-150"
                  style={labelStyle}
                >
                  {getLabel(item)}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* ─── Bottom: lang toggle + copyright ─────────────── */}
      <div className="mt-auto px-4 py-4">
        <div
          className="mb-3 flex items-center gap-1.5 transition-opacity duration-150"
          style={labelStyle}
        >
          <button
            onClick={() => setLang('da')}
            className={cn(
              'text-[9px] tracking-[0.14em] uppercase transition-colors duration-150',
              lang === 'da' ? 'text-text' : 'text-text-3 hover:text-wine'
            )}
          >
            DA
          </button>
          <span className="text-[9px] text-text-3">·</span>
          <button
            onClick={() => setLang('en')}
            className={cn(
              'text-[9px] tracking-[0.14em] uppercase transition-colors duration-150',
              lang === 'en' ? 'text-text' : 'text-text-3 hover:text-wine'
            )}
          >
            EN
          </button>
        </div>
        <p
          className="whitespace-nowrap text-[10px] text-text-3 transition-opacity duration-150"
          style={labelStyle}
        >
          © Ruth-Anne Dausell
        </p>
      </div>
    </motion.nav>
  )
}
