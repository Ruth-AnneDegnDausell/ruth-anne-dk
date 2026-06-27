'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

type ExpItem = { role: string; type: string; place: string; period: string; testimonialHref?: string; projectHref?: string; externalHref?: string }
type EduItem = { title: string; place: string; period: string; projectHref?: string }
type VolItem = { role: string; place: string; period: string; testimonialHref?: string }
type AwardItem = { title: string; desc: string; year: string; testimonialHref?: string }

const T = {
  da: {
    label: 'CV',
    heading: 'Ruth-Anne Dausell',
    intro: 'Designer med speciale i visuel kommunikation, uddannet fra Designskolen Kolding 2023. Erfaring fra forlagsverden, mediehuse og freelanceprojekter inden for grafisk design, illustration og art direction.',

    expLabel: 'Arbejdserfaring',
    exp: [
      { role: 'Grafisk Designer & Illustrator', type: 'Freelance', place: 'Flaneur', period: '2024', projectHref: '/projekter/flaneur' },
      { role: 'Visuel Designer', type: 'Freelance', place: 'Videnskab.dk', period: '2024' },
      { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023' },
      { role: 'Grafisk Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023', testimonialHref: '/cv/udtalelser?i=1' },
      { role: 'Freelance Illustrator', type: 'Fast tilknyttet', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
      { role: 'Junior Art Director & Grafisk Redaktør', type: '', place: 'Vid&Sans', period: '2021-2022', testimonialHref: '/cv/udtalelser?i=0', externalHref: 'https://vidogsans.dk/' },
      { role: 'Grafisk Designer', type: 'Praktik', place: 'BOOKLAB Forlag', period: '2022', testimonialHref: '/cv/udtalelser?i=1' },
      { role: 'Pædagogmedhjælper', type: '', place: 'Elev Ungdomsklub', period: 'dec. 2019 – jun. 2022', testimonialHref: '/cv/udtalelser?i=4' },
      { role: 'Barnepige', type: '', place: 'Privat', period: 'sep. 2019 – jan. 2021' },
      { role: 'Møbel Designer', type: 'Praktik', place: 'Dahl Limited / Njord', period: '2019', testimonialHref: '/cv/udtalelser?i=3' },
      { role: 'Pædagogmedhjælper', type: '', place: 'Bording Børnehave', period: 'apr. 2018 – sep. 2018' },
      { role: 'Gartnermedarbejder', type: '', place: 'Hageland, Stiklestad, Norge', period: 'jun. 2015 – aug. 2015' },
    ] as ExpItem[],

    eduLabel: 'Uddannelse',
    edu: [
      { title: 'Designskolen Kolding', place: 'BA i Kommunikationsdesign', period: '2020-2023', projectHref: '/projekter/ba-afgangs-eksamen' },
      { title: 'DR Lab', place: 'DR', period: '2021' },
      { title: 'Grafik-kursus', place: 'Aarhus Kunstakademi', period: '2020' },
      { title: 'Designteknolog, Møbeldesign', place: 'TEKO', period: '2018-2020' },
      { title: 'Højskole', place: 'Testrup Højskole', period: '2017' },
      { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
    ] as EduItem[],

    volLabel: 'Frivilligt arbejde',
    vol: [
      { role: 'Fotografi og illustration', place: 'VeloMore', period: '2024-2025' },
      { role: 'Bestyrelsesmedlem, marketing', place: 'SportX', period: 'Fra 2023' },
      { role: 'Bestyrelsesformand', place: 'Floorballklubben Ciconia', period: 'Fra 2022' },
      { role: 'Bestyrelsesmedlem, kommunikation', place: 'Aarhus Børnehøjskole', period: 'Fra 2022', testimonialHref: '/cv/udtalelser?i=2' },
      { role: 'Underviser, kreative fag', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
    ] as VolItem[],

    skillsLabel: 'Færdigheder',
    skillGroups: [
      { name: 'Software', items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'] },
      { name: 'Discipliner', items: ['Visuel identitet', 'Illustration', 'UX · UI', 'Art direction', 'Konceptudvikling', 'Fotografering', '3D-tegning'] },
      { name: 'Metoder', items: ['Design thinking', 'Co-creation', 'Håndtegning'] },
    ],

    awardsLabel: 'Udmærkelser',
    awards: [
      { title: 'Legatmodtager', desc: 'HK/Privats Ophavsretsfond for afgangsprojekt', year: '2023', testimonialHref: '/cv/udtalelser?i=6' },
    ] as AwardItem[],

    seeRef: 'Se udtalelse →',
    seeProject: 'Se projekt →',
    seeExternal: 'Besøg website →',
    allRefs: 'Se alle udtalelser →',
  },
  en: {
    label: 'CV',
    heading: 'Ruth-Anne Dausell',
    intro: 'Visual communication designer, graduated from Designskolen Kolding in 2023. Experience from publishing, media, and freelance work spanning graphic design, illustration, and art direction.',

    expLabel: 'Work experience',
    exp: [
      { role: 'Graphic Designer & Illustrator', type: 'Freelance', place: 'Flaneur', period: '2024', projectHref: '/projekter/flaneur' },
      { role: 'Visual Designer', type: 'Freelance', place: 'Videnskab.dk', period: '2024' },
      { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023' },
      { role: 'Graphic Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023', testimonialHref: '/cv/udtalelser?i=1' },
      { role: 'Freelance Illustrator', type: 'Permanent', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
      { role: 'Junior Art Director & Graphic Editor', type: '', place: 'Vid&Sans', period: '2021-2022', testimonialHref: '/cv/udtalelser?i=0', externalHref: 'https://vidogsans.dk/' },
      { role: 'Graphic Designer', type: 'Internship', place: 'BOOKLAB Forlag', period: '2022', testimonialHref: '/cv/udtalelser?i=1' },
      { role: 'Teaching Assistant', type: '', place: 'Elev Youth Club', period: 'Dec. 2019 – Jun. 2022', testimonialHref: '/cv/udtalelser?i=4' },
      { role: 'Nanny', type: '', place: 'Private', period: 'Sep. 2019 – Jan. 2021' },
      { role: 'Furniture Designer', type: 'Internship', place: 'Dahl Limited / Njord', period: '2019', testimonialHref: '/cv/udtalelser?i=3' },
      { role: 'Teaching Assistant', type: '', place: 'Bording Nursery', period: 'Apr. 2018 – Sep. 2018' },
      { role: 'Garden Centre Worker', type: '', place: 'Hageland, Stiklestad, Norway', period: 'Jun. 2015 – Aug. 2015' },
    ] as ExpItem[],

    eduLabel: 'Education',
    edu: [
      { title: 'Designskolen Kolding', place: 'BA in Communication Design', period: '2020-2023', projectHref: '/projekter/ba-afgangs-eksamen' },
      { title: 'DR Lab', place: 'DR', period: '2021' },
      { title: 'Graphics course', place: 'Aarhus Art Academy', period: '2020' },
      { title: 'Design Technologist, Furniture Design', place: 'TEKO', period: '2018-2020' },
      { title: 'Højskole', place: 'Testrup Højskole', period: '2017' },
      { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
    ] as EduItem[],

    volLabel: 'Voluntary work',
    vol: [
      { role: 'Photography and illustration', place: 'VeloMore', period: '2024-2025' },
      { role: 'Board member, marketing', place: 'SportX', period: 'From 2023' },
      { role: 'Board chair', place: 'Floorball Club Ciconia', period: 'From 2022' },
      { role: 'Board member, communications', place: 'Aarhus Børnehøjskole', period: 'From 2022', testimonialHref: '/cv/udtalelser?i=2' },
      { role: 'Teacher, creative subjects', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
    ] as VolItem[],

    skillsLabel: 'Skills',
    skillGroups: [
      { name: 'Software', items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'] },
      { name: 'Disciplines', items: ['Visual identity', 'Illustration', 'UX · UI', 'Art direction', 'Concept development', 'Photography', '3D drawing'] },
      { name: 'Methods', items: ['Design thinking', 'Co-creation', 'Hand drawing'] },
    ],

    awardsLabel: 'Awards',
    awards: [
      { title: 'Grant recipient', desc: 'HK/Privats Ophavsretsfond, graduation project', year: '2023', testimonialHref: '/cv/udtalelser?i=6' },
    ] as AwardItem[],

    seeRef: 'See reference →',
    seeProject: 'See project →',
    seeExternal: 'Visit website →',
    allRefs: 'See all references →',
  },
}

export default function CVPage() {
  const { lang } = useLang()
  const t = T[lang]

  return (
    <main className="min-h-screen px-8 pb-28 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">
          {t.label}
        </p>
        <h1 className="mb-5 text-[13px] font-[450] tracking-tight text-text">
          {t.heading}
        </h1>
        <p className="max-w-md text-[12px]/[1.85] text-text-2">{t.intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_180px]">

        {/* ─── Left: Experience + Education + Voluntary ─── */}
        <div className="space-y-12">

          <motion.div {...fadeUp(0)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
              {t.expLabel}
            </p>
            <ul className="divide-y divide-border border-t border-border">
              {t.exp.map((e) => (
                <li key={e.role + e.period} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">
                      {e.role}
                      {e.type && (
                        <span className="ml-1.5 text-[10px] font-normal text-text-3">({e.type})</span>
                      )}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{e.place}</p>
                      {e.testimonialHref && (
                        <Link href={e.testimonialHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                          {t.seeRef}
                        </Link>
                      )}
                      {e.projectHref && (
                        <Link href={e.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                          {t.seeProject}
                        </Link>
                      )}
                      {e.externalHref && (
                        <a href={e.externalHref} target="_blank" rel="noopener noreferrer" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                          {t.seeExternal}
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.06)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
              {t.eduLabel}
            </p>
            <ul className="divide-y divide-border border-t border-border">
              {t.edu.map((e) => (
                <li key={e.title} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">{e.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{e.place}</p>
                      {e.projectHref && (
                        <Link href={e.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                          {t.seeProject}
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
              {t.volLabel}
            </p>
            <ul className="divide-y divide-border border-t border-border">
              {t.vol.map((v) => (
                <li key={v.role + v.place} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">{v.role}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{v.place}</p>
                      {v.testimonialHref && (
                        <Link href={v.testimonialHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                          {t.seeRef}
                        </Link>
                      )}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{v.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ─── Right: Skills + Awards ─── */}
        <motion.div {...fadeUp(0.04)} className="space-y-10">

          <div>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
              {t.skillsLabel}
            </p>
            <div className="space-y-7">
              {t.skillGroups.map((group) => (
                <div key={group.name}>
                  <p className="mb-2.5 text-[9px] text-text-3">{group.name}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-[11px] text-text-2">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">
              {t.awardsLabel}
            </p>
            <ul className="space-y-4">
              {t.awards.map((a) => (
                <li key={a.title}>
                  <p className="text-[12px] font-[450] text-text">{a.title}</p>
                  <p className="mt-0.5 text-[10px]/[1.6] text-text-2">{a.desc}</p>
                  <p className="mt-0.5 text-[10px] text-text-3">{a.year}</p>
                  {a.testimonialHref && (
                    <Link href={a.testimonialHref} className="mt-1 block text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
                      {t.seeRef}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link
              href="/cv/udtalelser"
              className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50"
            >
              {t.allRefs}
            </Link>
          </div>

        </motion.div>
      </div>
    </main>
  )
}
