'use client'

import { useState, useRef, useCallback } from 'react'
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
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type SubItem = { label: string; href: string }

type NavItem = {
  label: string
  href?: string
  icon: React.ReactNode
  sub?: SubItem[]
}

const NAV: NavItem[] = [
  { label: 'Hjem', href: '/', icon: <Home strokeWidth={1.5} size={16} /> },
  {
    label: 'Om mig',
    icon: <User strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'Privat', href: '/om-mig/privat' },
      { label: 'Arbejde', href: '/om-mig/arbejde' },
    ],
  },
  {
    label: 'Projekter',
    icon: <FolderOpen strokeWidth={1.5} size={16} />,
    sub: [
      { label: 'Alle projekter', href: '/projekter' },
      { label: 'Branding', href: '/projekter/branding' },
      { label: 'Illustration', href: '/projekter/illustration' },
      { label: 'UX · UI', href: '/projekter/ux-ui' },
    ],
  },
  {
    label: 'Illustrationer',
    href: '/illustrationer',
    icon: <Palette strokeWidth={1.5} size={16} />,
  },
  { label: 'CV', href: '/cv', icon: <FileText strokeWidth={1.5} size={16} /> },
  { label: 'Kontakt', href: '/kontakt', icon: <Mail strokeWidth={1.5} size={16} /> },
]

const sidebarVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

const subVariants = {
  hidden: { x: -8, opacity: 0 },
  visible: { x: 0, opacity: 1 },
}

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isOpen = pinned || open

  const handleMouseEnterZone = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (pinned) return
    closeTimer.current = setTimeout(() => {
      setOpen(false)
      setActiveGroup(null)
    }, 200)
  }, [pinned])

  const handleMouseEnterSidebar = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const handleTogglePin = () => {
    if (pinned) {
      setPinned(false)
      setOpen(false)
      setActiveGroup(null)
    } else {
      setPinned(true)
      setOpen(true)
    }
  }

  return (
    <>
      {/* Always-visible menu icon — hints at hidden sidebar, click to pin */}
      <button
        onClick={handleTogglePin}
        aria-label={pinned ? 'Luk menu' : 'Åbn menu'}
        className={cn(
          'fixed left-4 top-4 z-[202] flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150',
          pinned
            ? 'text-text hover:text-text-2'
            : 'text-text-3 hover:text-text-2'
        )}
      >
        {pinned ? (
          <X strokeWidth={1.5} size={14} />
        ) : (
          <Menu strokeWidth={1.5} size={14} />
        )}
      </button>

      {/* Hover trigger zone — wider than the old 24px so sidebar appears earlier */}
      {!isOpen && (
        <div
          className="fixed left-0 top-0 z-[200] h-full w-20"
          onMouseEnter={handleMouseEnterZone}
          onMouseLeave={handleMouseLeave}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnterSidebar}
            onMouseLeave={handleMouseLeave}
            className="fixed left-0 top-0 z-[199] flex h-full"
          >
            {/* Main sidebar */}
            <div className="flex h-full w-56 flex-col border-r border-border bg-surface/95 px-4 py-8 backdrop-blur-lg backdrop-saturate-150">
              <p className="mb-8 text-[10px] font-medium tracking-[0.18em] uppercase text-text-3">
                Ruth-Anne
              </p>

              <ul className="flex flex-col gap-0.5">
                {NAV.map((item) => {
                  const isActive = item.href
                    ? pathname === item.href
                    : item.sub?.some((s) => pathname.startsWith(s.href))
                  const hasGroup = item.sub && item.sub.length > 0

                  return (
                    <li key={item.label}>
                      {hasGroup ? (
                        <button
                          onClick={() =>
                            setActiveGroup(
                              activeGroup === item.label ? null : item.label,
                            )
                          }
                          className={cn(
                            'flex w-full items-center justify-between rounded-[--radius-sm] px-3 py-2 text-sm/5 transition-colors duration-[--duration-fast]',
                            isActive
                              ? 'bg-accent-bg text-text'
                              : 'text-text-2 hover:bg-surface-2 hover:text-text',
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            {item.icon}
                            {item.label}
                          </span>
                          <ChevronRight
                            strokeWidth={1.5}
                            size={14}
                            className={cn(
                              'transition-transform duration-[--duration-fast]',
                              activeGroup === item.label && 'rotate-90',
                            )}
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => { setOpen(false); if (!pinned) setActiveGroup(null) }}
                          className={cn(
                            'flex items-center gap-2.5 rounded-[--radius-sm] px-3 py-2 text-sm/5 transition-colors duration-[--duration-fast]',
                            isActive
                              ? 'bg-accent-bg text-text'
                              : 'text-text-2 hover:bg-surface-2 hover:text-text',
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="mt-auto border-t border-border pt-6">
                <p className="text-[10px] text-text-3">© Ruth-Anne Dausell</p>
              </div>
            </div>

            {/* Sub-sidebar */}
            <AnimatePresence>
              {activeGroup && (
                <motion.div
                  key={activeGroup}
                  variants={subVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full w-44 flex-col border-r border-border bg-surface/90 px-4 py-8 backdrop-blur-lg backdrop-saturate-150"
                >
                  <p className="mb-4 text-[10px] font-medium tracking-[0.15em] uppercase text-text-3">
                    {activeGroup}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {NAV.find((n) => n.label === activeGroup)?.sub?.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={() => {
                            setOpen(false)
                            setActiveGroup(null)
                          }}
                          className={cn(
                            'block rounded-[--radius-sm] px-3 py-2 text-sm/5 transition-colors duration-[--duration-fast]',
                            pathname === sub.href
                              ? 'bg-accent-bg text-text'
                              : 'text-text-2 hover:bg-surface-2 hover:text-text',
                          )}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
