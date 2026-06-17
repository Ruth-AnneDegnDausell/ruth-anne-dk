'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ImageIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
}

const PROJECTS = [
  { category: 'Branding', title: 'Nordisk Cykelklub · Visuel identitet', year: '2024' },
  { category: 'Illustration', title: 'Tour de France · Etapeillustration serie', year: '2023' },
  { category: 'UX · UI', title: 'Sportstracker app · Interface design', year: '2024' },
]

const SKILLS = [
  {
    title: 'Visuel identitet',
    num: '01',
    desc: 'Fra logo og farvepalette til typografi og brand guidelines. Sammenhængende identiteter der holder over tid og skiller sig ud i sit marked. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Illustration',
    num: '02',
    desc: 'Håndtegnede og digitale illustrationer til print, web og sociale medier. Specialiseret i sportsillustration, portræt og editorial grafik.',
  },
  {
    title: 'UX · UI design',
    num: '03',
    desc: 'Interface design med fokus på brugeroplevelse og tilgængelighed. Fra wireframes og prototyper til færdige UI-systemer klar til produktion.',
  },
  {
    title: 'Art direction',
    num: '04',
    desc: 'Kreativ ledelse af visuelle projekter fra konceptudvikling til produktion. Arbejder tæt med fotografer, illustratorer og producenter.',
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [openSkill, setOpenSkill] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <main className="min-h-screen">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden px-8 pb-10 pt-14 sm:flex-row sm:items-stretch sm:px-14 sm:pb-14"
      >
        {/* Left — text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col justify-between py-4 sm:w-[42%]"
        >
          <div>
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-8 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3"
            >
              Designer · Illustratør
            </motion.p>

            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-[clamp(0.95rem,1.4vw,1.1rem)]/[1.15] font-[300] tracking-[-0.01em] text-text"
            >
              Ruth-Anne Dausell
            </motion.h1>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="mt-5 max-w-[260px] text-[12px]/[1.75] text-text-2"
            >
              Kreativt arbejde, gennemtænkt design og projekter der efterlader et varigt indtryk.
            </motion.p>
          </div>

          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col gap-3"
          >
            <a
              href="/projekter"
              className="group inline-flex w-fit items-center gap-1.5 text-[11px] font-medium tracking-wide text-text transition-opacity duration-150 hover:opacity-50"
            >
              Se projekter
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="/om-mig/arbejde"
              className="inline-flex w-fit text-[11px] text-text-3 transition-opacity duration-150 hover:opacity-50"
            >
              Om mig
            </a>
          </motion.div>
        </motion.div>

        {/* Right — hero image placeholder */}
        <motion.div
          style={{ y: imageY }}
          className="relative z-10 mt-8 overflow-hidden rounded-2xl sm:mt-0 sm:w-[54%]"
        >
          <div className="flex h-full min-h-[60vw] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border-2 bg-surface text-center sm:min-h-0">
            <ImageIcon strokeWidth={1} size={24} className="text-text-3" />
            <div>
              <p className="text-[11px] font-[450] text-text-2">Indsæt portræt-billede her</p>
              <p className="mt-0.5 text-[10px] text-text-3">Anbefalet: portræt · min. 1200 × 1600 px</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-10 left-8 flex items-center gap-2 sm:left-14"
        >
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}>
            <ArrowDown strokeWidth={1.5} size={12} className="text-text-3" />
          </motion.div>
          <p className="text-[9px] tracking-[0.22em] uppercase text-text-3">Scroll</p>
        </motion.div>
      </section>

      {/* ─── Udvalgte projekter ────────────────────────────────── */}
      <section className="px-8 py-28 sm:px-14">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-5">
          <h2 className="text-[10px] font-[500] tracking-[0.18em] uppercase text-text-3">Udvalgte projekter</h2>
          <a href="/projekter" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
            Se alle →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="/projekter"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[oklch(92%_0_0)]">
                <div className="h-full w-full bg-[oklch(91%_0_0)] transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="px-4 py-3.5">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {project.category} · {project.year}
                </p>
                <p className="mt-1 text-[12px]/[1.5] font-[430] text-text">{project.title}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── Om mig ───────────────────────────────────────────── */}
      <section className="border-t border-border px-8 py-28 sm:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          {/* Text */}
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.2em] uppercase text-text-3">Om mig</p>
            <h2 className="mb-5 text-[13px]/[1.5] font-[450] tracking-tight text-text">
              Designer med øje for detaljen og passion for det håndgjorte udtryk.
            </h2>
            <p className="max-w-sm text-[12px]/[1.8] text-text-2">
              Uddannet fra Designskolen Kolding med speciale i visuel kommunikation.
              Har i de seneste tre år arbejdet som freelance designer med kunder
              inden for sport, kultur og mode. Bor og arbejder i København.
            </p>
            <p className="mt-4 max-w-sm text-[12px]/[1.8] text-text-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation.
            </p>
            <a
              href="/om-mig/arbejde"
              className="mt-7 inline-flex items-center gap-1.5 text-[11px] font-medium text-text transition-opacity duration-150 hover:opacity-50"
            >
              Læs mere →
            </a>
          </div>

          {/* Skills accordion */}
          <div className="divide-y divide-border border-t border-border">
            {SKILLS.map((skill, i) => (
              <div key={skill.title}>
                <button
                  onClick={() => setOpenSkill(openSkill === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-[12px] text-text">{skill.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] tracking-[0.14em] text-text-3">{skill.num}</span>
                    <ChevronDown
                      size={11}
                      strokeWidth={1.5}
                      className={cn(
                        'text-text-3 transition-transform duration-200',
                        openSkill === i && 'rotate-180'
                      )}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openSkill === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-[11px]/[1.7] text-text-2">{skill.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border px-8 py-8 sm:px-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-text-3">© Ruth-Anne Dausell</p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/ruthannedausell"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
            >
              Instagram ↗
            </a>
            <a href="/cv" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">CV</a>
            <a href="/kontakt" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">Kontakt</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
