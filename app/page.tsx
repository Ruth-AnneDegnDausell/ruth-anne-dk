'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease },
  }),
}

const PROJECTS = [
  {
    category: 'Branding',
    title: 'Nordisk Cykelklub — Visuel identitet',
    year: '2024',
  },
  {
    category: 'Illustration',
    title: 'Tour de France — Etapeillustration serie',
    year: '2023',
  },
  {
    category: 'UX / UI',
    title: 'Sportstracker app — Interface design',
    year: '2024',
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <main className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-end overflow-hidden pb-16 pl-10 pr-8 pt-24 sm:pb-28 sm:pl-20"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="h-full w-full bg-gradient-to-br from-[oklch(92%_0_0)] via-[oklch(94%_0_0)] to-[oklch(90%_0_0)]" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-2xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 text-[11px] font-medium tracking-[0.2em] uppercase text-text-3"
          >
            Designer &amp; Illustratør ™
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 text-6xl/[0.95] font-[300] tracking-[-0.03em] text-text sm:text-8xl/[0.92]"
          >
            Ruth-Anne
            <br />
            <span className="text-text-2">Dausell</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-sm text-base/7 font-[350] text-text-2"
          >
            Kreativt arbejde, gennemtænkt design
            og projekter der efterlader et varigt indtryk.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="/projekter"
              className="group flex items-center gap-2 text-sm/5 font-medium text-text transition-opacity duration-150 hover:opacity-50"
            >
              Se projekter
              <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="h-px w-8 bg-border" />
            <a
              href="/om-mig/arbejde"
              className="text-sm/5 text-text-2 transition-opacity duration-150 hover:opacity-50"
            >
              Om mig
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown strokeWidth={1.5} size={15} className="text-text-3" />
          </motion.div>
          <p className="[writing-mode:vertical-rl] text-[9px] tracking-[0.2em] uppercase text-text-3">
            Scroll
          </p>
        </motion.div>
      </section>

      {/* ─── Selected work ─────────────────────────────────────── */}
      <section className="px-8 py-24 sm:px-20">
        <div className="mb-14 flex items-end justify-between border-b border-border pb-6">
          <h2 className="text-2xl/[1.1] font-[300] tracking-tight text-text">
            Udvalgte projekter
          </h2>
          <a
            href="/projekter"
            className="text-sm/5 text-text-3 transition-opacity duration-150 hover:opacity-50"
          >
            Se alle →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="/projekter"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_28px_rgba(0,0,0,0.05)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[oklch(92%_0_0)]">
                <div className="h-full w-full bg-gradient-to-br from-[oklch(91%_0_0)] to-[oklch(88%_0_0)] transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-text-3">
                  {project.category} · {project.year}
                </p>
                <p className="mt-1.5 text-sm/5 font-[450] text-text">
                  {project.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── Om mig teaser ─────────────────────────────────────── */}
      <section className="border-t border-border px-8 py-24 sm:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.18em] uppercase text-text-3">
              Om mig
            </p>
            <h2 className="mb-6 text-3xl/[1.1] font-[300] tracking-tight text-text">
              Designer med øje for detaljen og passion for det håndgjorte udtryk.
            </h2>
            <p className="max-w-prose text-base/7 text-text-2">
              Uddannet fra Designskolen Kolding med speciale i visuel kommunikation.
              Har i de seneste tre år arbejdet som freelance designer med kunder
              inden for sport, kultur og mode. Bor og arbejder i København.
            </p>
            <a
              href="/om-mig/arbejde"
              className="mt-8 inline-flex items-center gap-2 text-sm/5 font-medium text-text transition-opacity duration-150 hover:opacity-50"
            >
              Læs mere om mig →
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {['Visuel identitet', 'Illustration', 'UX / UI design', 'Art direction'].map(
              (skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4"
                >
                  <span className="text-sm/5 text-text">{skill}</span>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-text-3">
                    0{i + 1}
                  </span>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-border px-8 py-10 sm:px-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs/5 text-text-3">© Ruth-Anne Dausell</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/ruthannedausell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs/5 text-text-3 transition-opacity duration-150 hover:opacity-50"
            >
              Instagram ↗
            </a>
            <a href="/cv" className="text-xs/5 text-text-3 transition-opacity duration-150 hover:opacity-50">
              CV
            </a>
            <a href="/kontakt" className="text-xs/5 text-text-3 transition-opacity duration-150 hover:opacity-50">
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
