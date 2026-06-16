'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <main className="min-h-screen">
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-end overflow-hidden pb-16 pl-10 pr-8 pt-24 sm:pb-24 sm:pl-20"
      >
        {/* Background image placeholder */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <div className="h-full w-full bg-gradient-to-br from-[oklch(91%_0.015_75)] via-[oklch(94%_0.01_60)] to-[oklch(89%_0.02_30)]" />
          {/* Replace the div above with <Image> once you have your hero photo */}
        </motion.div>

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.025]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-2xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 text-[11px] font-medium tracking-[0.2em] uppercase text-text-3"
          >
            Designer & Illustratør ™
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
            og projekter der efterlader et indtryk.
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
              className="group flex items-center gap-2 text-sm/5 font-medium text-text transition-opacity duration-[--duration-fast] hover:opacity-60"
            >
              Se projekter
              <span className="inline-block transition-transform duration-[--duration-fast] group-hover:translate-x-1">→</span>
            </a>
            <span className="h-px w-8 bg-border" />
            <a
              href="/om-mig/arbejde"
              className="text-sm/5 text-text-2 transition-opacity duration-[--duration-fast] hover:opacity-60"
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
            <ArrowDown strokeWidth={1.5} size={16} className="text-text-3" />
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
            className="text-sm/5 text-text-3 transition-opacity duration-[--duration-fast] hover:opacity-60"
          >
            Se alle →
          </a>
        </div>

        {/* Project grid — populated via Supabase later */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-[--radius-lg] border border-border bg-surface"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[oklch(93%_0.012_75)] to-[oklch(90%_0.02_30)] transition-[transform] duration-[--duration-slow] group-hover:scale-[1.02]" />
              <div className="p-5">
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-text-3">
                  Projekt {i}
                </p>
                <p className="mt-1 text-sm/5 font-[450] text-text">
                  Tilføjes snart
                </p>
              </div>
            </motion.div>
          ))}
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
              className="text-xs/5 text-text-3 transition-opacity duration-[--duration-fast] hover:opacity-60"
            >
              Instagram ↗
            </a>
            <a
              href="/cv"
              className="text-xs/5 text-text-3 transition-opacity duration-[--duration-fast] hover:opacity-60"
            >
              CV
            </a>
            <a
              href="/kontakt"
              className="text-xs/5 text-text-3 transition-opacity duration-[--duration-fast] hover:opacity-60"
            >
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
