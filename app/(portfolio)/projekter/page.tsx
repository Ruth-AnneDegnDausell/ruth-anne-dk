'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const PROJECTS = [
  {
    id: 1,
    category: 'Branding',
    title: 'Nordisk Cykelklub · Visuel identitet',
    year: '2024',
    desc: 'Komplet visuel identitet for nordisk cykelklub med fokus på enkelhed og bevægelse. Logo, farvepalette, typografi og brand guidelines.',
  },
  {
    id: 2,
    category: 'Illustration',
    title: 'Tour de France · Etapeillustration serie',
    year: '2023',
    desc: 'Serie af illustrationer til Tour de France etapeprogram. Kombinerer analog og digital teknik i en sammenhængende visuel fortælling.',
  },
  {
    id: 3,
    category: 'UX · UI',
    title: 'Sportstracker app · Interface design',
    year: '2024',
    desc: 'Komplet interface design for sportsapplikation med fokus på brugervenlighed og datavisualisering. Fra wireframes til færdigt UI-system.',
  },
  {
    id: 4,
    category: 'Branding',
    title: 'Køge Bugt FC · Sæsonkampagne',
    year: '2023',
    desc: 'Visuel kampagne for lokal fodboldklub med fokus på lokal forankring og fællesskab. Print, social og in-stadium materialer.',
  },
  {
    id: 5,
    category: 'Illustration',
    title: 'Velo Magazine · Editorial illustration',
    year: '2024',
    desc: 'Månedlige illustrationer til cykelmagasin med portræt og editorial karakter. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 6,
    category: 'UX · UI',
    title: 'Træningsplatform · Dashboard design',
    year: '2022',
    desc: 'Data dashboard for personlig træningsplatform med realtidsopdateringer. Fokus på læsbarhed og hurtig scanning af nøgletal.',
  },
]

const CATEGORIES = ['Alle', 'Branding', 'Illustration', 'UX · UI']

export default function Projekter() {
  const [active, setActive] = useState('Alle')

  const filtered =
    active === 'Alle' ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <main className="min-h-screen px-8 pb-28 pt-16 sm:px-14">

      {/* Header */}
      <div className="mb-12">
        <p className="mb-3 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          Arbejder
        </p>
        <h1 className="mb-8 text-[13px] font-[450] tracking-tight text-text">
          Udvalgte projekter
        </h1>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                active === cat
                  ? 'rounded-full bg-accent px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-surface transition-colors duration-150'
                  : 'rounded-full border border-border bg-surface px-3 py-1.5 text-[10px] font-medium tracking-[0.06em] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text'
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.3, ease }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <div className="h-full w-full bg-[oklch(91%_0_0)] transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="px-4 py-4">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {project.category} · {project.year}
                </p>
                <p className="mt-1.5 text-[12px]/[1.4] font-[430] text-text">
                  {project.title}
                </p>
                <p className="mt-2 text-[11px]/[1.65] text-text-2">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

    </main>
  )
}
