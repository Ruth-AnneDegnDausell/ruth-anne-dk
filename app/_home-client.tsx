'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang-context'
import type { Project } from '@/lib/projects'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
}

const SKILLS = {
  da: [
    { title: 'Visuel identitet', num: '01', desc: 'Fra logo og farvepalette til typografi og brand guidelines. Sammenhængende identiteter der holder over tid og skiller sig ud i sit marked.' },
    { title: 'Illustration', num: '02', desc: 'Håndtegnede og digitale illustrationer til print, web og sociale medier. Specialiseret i sportsillustration, portræt og editorial grafik.' },
    { title: 'UX · UI design', num: '03', desc: 'Interface design med fokus på brugeroplevelse og tilgængelighed. Fra wireframes og prototyper til færdige UI-systemer klar til produktion.' },
    { title: 'Art direction', num: '04', desc: 'Kreativ ledelse af visuelle projekter fra konceptudvikling til produktion. Arbejder tæt med fotografer, illustratorer og producenter.' },
  ],
  en: [
    { title: 'Visual identity', num: '01', desc: 'From logo and colour palette to typography and brand guidelines. Coherent identities that hold up over time and stand out in their market.' },
    { title: 'Illustration', num: '02', desc: 'Hand-drawn and digital illustrations for print, web, and social media. Specialised in sports illustration, portrait, and editorial graphics.' },
    { title: 'UX · UI design', num: '03', desc: 'Interface design focused on user experience and accessibility. From wireframes and prototypes to finished UI systems ready for production.' },
    { title: 'Art direction', num: '04', desc: 'Creative direction of visual projects from concept development to production. Works closely with photographers, illustrators, and producers.' },
  ],
}

const T = {
  da: {
    tagline: 'Designer · Illustratør',
    intro: 'Kreativt arbejde, gennemtænkt design og projekter der efterlader et varigt indtryk.',
    seeProjects: 'Se projekter',
    about: 'Om mig',
    selectedWork: 'Udvalgte projekter',
    seeAll: 'Se alle →',
    aboutLabel: 'Om mig',
    aboutHeading: 'Designer med øje for detaljen og passion for det håndgjorte udtryk.',
    aboutBody1: 'Uddannet fra Designskolen Kolding med speciale i visuel kommunikation. Har arbejdet med visuel identitet, illustration og videoproduktion for kunder inden for sport, kultur og livsstil.',
    aboutBody2: 'Baseret nord for Aarhus, arbejder jeg tæt med kunder fra første brief til færdigt produkt. Med to designuddannelser bag mig er min tilgang præcis og konceptdrevet.',
    readMore: 'Læs mere →',
  },
  en: {
    tagline: 'Designer · Illustrator',
    intro: 'Creative work, considered design, and projects that leave a lasting impression.',
    seeProjects: 'View projects',
    about: 'About',
    selectedWork: 'Selected projects',
    seeAll: 'See all →',
    aboutLabel: 'About',
    aboutHeading: 'Designer with an eye for detail and a passion for handcrafted expression.',
    aboutBody1: 'Graduated from Designskolen Kolding with a specialisation in visual communication. Has worked on visual identity, illustration, and video production for clients in sports, culture, and lifestyle.',
    aboutBody2: 'Based north of Aarhus, I work closely with clients from first brief to finished product. With two design degrees behind me, my approach is precise and concept-driven.',
    readMore: 'Read more →',
  },
}

export function HomeClient({ featured, forside }: { featured: Project[]; forside?: any }) {
  const { lang } = useLang()
  const t = T[lang]

  // Skills fra Sanity (numre sættes automatisk efter rækkefølgen), fallback til koden
  const sanitySkills = (lang === 'en' ? forside?.skillsEn : forside?.skills) as
    | Array<{ title?: string; desc?: string }>
    | undefined
  const skills = sanitySkills?.length
    ? sanitySkills.map((s, i) => ({
        title: s.title ?? '',
        desc: s.desc ?? '',
        num: String(i + 1).padStart(2, '0'),
      }))
    : SKILLS[lang]

  // Sanity-indhold overstyrer defaults når det er udfyldt
  const en = lang === 'en'
  const c = {
    tagline: (en ? forside?.taglineEn : forside?.tagline) ?? t.tagline,
    intro: (en ? forside?.introEn : forside?.intro) ?? t.intro,
    aboutHeading: (en ? forside?.aboutHeadingEn : forside?.aboutHeading) ?? t.aboutHeading,
    aboutBody1: (en ? forside?.aboutBody1En : forside?.aboutBody1) ?? t.aboutBody1,
    aboutBody2: (en ? forside?.aboutBody2En : forside?.aboutBody2) ?? t.aboutBody2,
  }
  const heroSrc = forside?.heroImageUrl ?? '/mig/Forside.webp'

  const heroRef = useRef<HTMLDivElement>(null)
  const [openSkill, setOpenSkill] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <main>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex flex-col justify-between overflow-hidden px-8 pb-10 pt-14 sm:min-h-screen sm:flex-row sm:items-stretch sm:px-14 sm:pb-14"
      >
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col justify-between py-4 sm:w-[42%]"
        >
          <div>
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="mb-8 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3"
            >
              {c.tagline}
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
              {c.intro}
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
              {t.seeProjects}
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="/om-mig/privat"
              className="inline-flex w-fit items-center gap-1 text-[11px] text-text-2 transition-opacity duration-150 hover:opacity-50"
            >
              {t.about} →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          className="relative z-10 mt-8 overflow-hidden rounded-2xl sm:mt-0 sm:w-[54%]"
        >
          <div className="relative h-full min-h-[60vw] overflow-hidden rounded-2xl bg-[oklch(91%_0_0)] sm:min-h-0">
            <Image
              src={heroSrc}
              alt="Ruth-Anne Dausell"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 54vw"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute bottom-10 left-8 hidden items-center gap-2 sm:left-14 sm:flex"
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
          <h2 className="text-[10px] font-[500] tracking-[0.18em] uppercase text-text-3">{t.selectedWork}</h2>
          <a href="/projekter" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
            {t.seeAll}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.a
              key={project.slug}
              href={`/projekter/${project.slug}?from=home`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_2px_6px_rgba(0,0,0,0.05),0_6px_20px_rgba(0,0,0,0.04)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[oklch(92%_0_0)]">
                {(project.coverThumb ?? project.cover) ? (
                  <Image
                    src={project.coverThumb ?? project.cover!}
                    alt={lang === 'en' ? project.titleEn : project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={project.coverThumb ? undefined : { objectPosition: project.coverPosition ?? '50% 0%' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="h-full w-full bg-[oklch(91%_0_0)] transition-transform duration-500 group-hover:scale-[1.03]" />
                )}
              </div>
              <div className="px-4 py-3.5">
                <p className="text-[9px] tracking-[0.14em] uppercase text-text-3">
                  {lang === 'en' ? project.categoryLabelEn : project.categoryLabel} · {project.year}
                </p>
                <p className="mt-1 text-[12px]/[1.5] font-[430] text-text">
                  {lang === 'en' ? project.titleEn : project.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ─── Om mig ───────────────────────────────────────────── */}
      <section className="border-t border-border px-8 py-28 sm:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">

          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.2em] uppercase text-text-3">{t.aboutLabel}</p>
            <h2 className="mb-5 text-[13px]/[1.5] font-[450] tracking-tight text-text">
              {c.aboutHeading}
            </h2>
            <p className="max-w-sm text-[12px]/[1.8] text-text-2">{c.aboutBody1}</p>
            <p className="mt-4 max-w-sm text-[12px]/[1.8] text-text-2">{c.aboutBody2}</p>
            <a
              href="/om-mig/privat"
              className="mt-7 inline-flex items-center gap-1.5 text-[11px] font-medium text-text transition-opacity duration-150 hover:opacity-50"
            >
              {t.readMore}
            </a>
          </div>

          {/* Skills accordion */}
          <div className="divide-y divide-border border-t border-border">
            {skills.map((skill, i) => (
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

    </main>
  )
}
