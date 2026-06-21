'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/lib/lang-context'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const T = {
  da: {
    label: 'CV',
    heading: 'Ruth-Anne Dausell',
    intro: 'Designer med speciale i visuel kommunikation, uddannet fra Designskolen Kolding 2023. Erfaring fra forlagsverden, mediehuse og freelanceprojekter inden for grafisk design, illustration og art direction.',

    expLabel: 'Arbejdserfaring',
    exp: [
      { role: 'Visuel Designer', type: 'Freelance', place: 'Videnskab.dk', period: '2024' },
      { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023' },
      { role: 'Grafisk Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023' },
      { role: 'Freelance Illustrator', type: 'Fast tilknyttet', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
      { role: 'Junior Art Director & Grafisk Redaktør', type: '', place: 'Vid&Sans', period: '2021-2022' },
      { role: 'Grafisk Designer', type: 'Praktik', place: 'BOOKLAB Forlag', period: '2022' },
      { role: 'Møbel Designer', type: 'Praktik', place: 'Dahl Limited / Njord', period: '2019' },
    ],

    eduLabel: 'Uddannelse',
    edu: [
      { title: 'Bachelor i Kommunikationsdesign', place: 'Designskolen Kolding', period: '2020-2023' },
      { title: 'DR Lab', place: 'DR', period: '2021' },
      { title: 'Grafik-kursus', place: 'Aarhus Kunstakademi', period: '2020' },
      { title: 'Designteknolog, Møbeldesign', place: 'TEKO', period: '2018-2020' },
      { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
    ],

    volLabel: 'Frivilligt arbejde',
    vol: [
      { role: 'Fotografi og illustration', place: 'VeloMore', period: '2024-2025' },
      { role: 'Bestyrelsesmedlem, marketing', place: 'SportX', period: 'Fra 2023' },
      { role: 'Bestyrelsesformand', place: 'Floorballklubben Ciconia', period: 'Fra 2022' },
      { role: 'Bestyrelsesmedlem, kommunikation', place: 'Aarhus Børnehøjskole', period: 'Fra 2022' },
      { role: 'Underviser, kreative fag', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
    ],

    skillsLabel: 'Færdigheder',
    skillGroups: [
      {
        name: 'Software',
        items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'],
      },
      {
        name: 'Discipliner',
        items: ['Visuel identitet', 'Illustration', 'UX · UI', 'Art direction', 'Konceptudvikling', 'Fotografering', '3D-tegning'],
      },
      {
        name: 'Metoder',
        items: ['Design thinking', 'Co-creation', 'Håndtegning'],
      },
    ],

    awardsLabel: 'Udmærkelser',
    awards: [
      { title: 'Legatmodtager', desc: 'HK/Privats Ophavsretsfond for afgangsprojekt', year: '2023' },
    ],
  },
  en: {
    label: 'CV',
    heading: 'Ruth-Anne Dausell',
    intro: 'Visual communication designer, graduated from Designskolen Kolding in 2023. Experience from publishing, media, and freelance work spanning graphic design, illustration, and art direction.',

    expLabel: 'Work experience',
    exp: [
      { role: 'Visual Designer', type: 'Freelance', place: 'Videnskab.dk', period: '2024' },
      { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023' },
      { role: 'Graphic Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023' },
      { role: 'Freelance Illustrator', type: 'Permanent', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
      { role: 'Junior Art Director & Graphic Editor', type: '', place: 'Vid&Sans', period: '2021-2022' },
      { role: 'Graphic Designer', type: 'Internship', place: 'BOOKLAB Forlag', period: '2022' },
      { role: 'Furniture Designer', type: 'Internship', place: 'Dahl Limited / Njord', period: '2019' },
    ],

    eduLabel: 'Education',
    edu: [
      { title: 'BA in Communication Design', place: 'Designskolen Kolding', period: '2020-2023' },
      { title: 'DR Lab', place: 'DR', period: '2021' },
      { title: 'Graphics course', place: 'Aarhus Art Academy', period: '2020' },
      { title: 'Design Technologist, Furniture Design', place: 'TEKO', period: '2018-2020' },
      { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
    ],

    volLabel: 'Voluntary work',
    vol: [
      { role: 'Photography and illustration', place: 'VeloMore', period: '2024-2025' },
      { role: 'Board member, marketing', place: 'SportX', period: 'From 2023' },
      { role: 'Board chair', place: 'Floorball Club Ciconia', period: 'From 2022' },
      { role: 'Board member, communications', place: 'Aarhus Børnehøjskole', period: 'From 2022' },
      { role: 'Teacher, creative subjects', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
    ],

    skillsLabel: 'Skills',
    skillGroups: [
      {
        name: 'Software',
        items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'],
      },
      {
        name: 'Disciplines',
        items: ['Visual identity', 'Illustration', 'UX · UI', 'Art direction', 'Concept development', 'Photography', '3D drawing'],
      },
      {
        name: 'Methods',
        items: ['Design thinking', 'Co-creation', 'Hand drawing'],
      },
    ],

    awardsLabel: 'Awards',
    awards: [
      { title: 'Grant recipient', desc: 'HK/Privats Ophavsretsfond, graduation project', year: '2023' },
    ],
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
                    <p className="mt-0.5 text-[11px] text-text-2">{e.place}</p>
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
                    <p className="mt-0.5 text-[11px] text-text-2">{e.place}</p>
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
                    <p className="mt-0.5 text-[11px] text-text-2">{v.place}</p>
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
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      </div>
    </main>
  )
}
