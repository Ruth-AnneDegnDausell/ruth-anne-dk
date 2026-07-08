'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'
import { downloadCv } from '@/lib/cv-download'

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
})

const DEFAULT_DA = {
  intro: 'Designer med speciale i visuel kommunikation, uddannet fra Designskolen Kolding 2023. Erfaring fra forlagsverden, mediehuse og freelanceprojekter inden for grafisk design, illustration og art direction.',
  exp: [
    { role: 'Grafisk Designer & Illustrator', type: 'Freelance', place: 'Flaneur', period: '2024', projectHref: '/projekter/flaneur' },
    { role: 'Freelance design', type: '', place: 'Videnskab.dk', period: '2024', projectHref: '/projekter/huslaegens-bord-podcast' },
    { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023', projectHref: '/projekter/kfum-kfuk' },
    { role: 'Grafisk Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023', testimonialHref: '/cv/udtalelser?i=1', projectHref: '/projekter/booklab' },
    { role: 'Freelance Illustrator', type: 'Fast tilknyttet', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
    { role: 'Junior Art Director & Grafisk Redaktør', type: '', place: 'Vid&Sans', period: '2021-2022', testimonialHref: '/cv/udtalelser?i=0', externalHref: 'https://vidogsans.dk/', projectHref: '/projekter/vid-sans' },
    { role: 'Grafisk Designer', type: 'Praktik', place: 'BOOKLAB Forlag', period: '2022', testimonialHref: '/cv/udtalelser?i=1', projectHref: '/projekter/booklab' },
    { role: 'Pædagogmedhjælper', type: '', place: 'Elev Ungdomsklub', period: 'dec. 2019-jun. 2022', testimonialHref: '/cv/udtalelser?i=4' },
    { role: 'Barnepige', type: '', place: 'Privat', period: 'sep. 2019-jan. 2021' },
    { role: 'Møbel Designer', type: 'Praktik', place: 'Dahl Limited / Njord', period: '2019', testimonialHref: '/cv/udtalelser?i=3' },
    { role: 'Pædagogmedhjælper', type: '', place: 'Bording Børnehave', period: 'apr. 2018-sep. 2018' },
    { role: 'Gartnermedarbejder', type: '', place: 'Hageland, Stiklestad, Norge', period: 'jun. 2015-aug. 2015' },
  ],
  edu: [
    { title: 'Designskolen Kolding', place: 'BA i Kommunikationsdesign', period: '2020-2023', projectHref: '/projekter/ba-afgangs-eksamen' },
    { title: 'Designteknolog, Møbeldesign', place: 'TEKO', period: '2018-2020' },
    { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
  ],
  kurser: [
    { title: 'DR Lab', place: 'DR', period: '2021' },
    { title: 'Grafik-kursus', place: 'Aarhus Kunstakademi', period: '2020' },
    { title: 'Højskole', place: 'Testrup Højskole', period: '2017' },
  ],
  vol: [
    { role: 'Fotografi og illustration', place: 'VeloMore', period: '2024-2025', projectHref: '/projekter/velo-magazine' },
    { role: 'Bestyrelsesmedlem, marketing', place: 'SportX', period: 'Fra 2023', projectHref: '/projekter/sportx' },
    { role: 'Bestyrelsesformand', place: 'Floorballklubben Ciconia', period: 'Fra 2022' },
    { role: 'Bestyrelsesmedlem, kommunikation', place: 'Aarhus Børnehøjskole', period: 'Fra 2022', testimonialHref: '/cv/udtalelser?i=2', projectHref: '/projekter/aarhus-bornehojskole' },
    { role: 'Underviser, kreative fag', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
  ],
  skillGroups: [
    { name: 'Software', items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'] },
    { name: 'Discipliner', items: ['Visuel identitet', 'Illustration', 'UX · UI', 'Art direction', 'Konceptudvikling', 'Fotografering', '3D-tegning'] },
    { name: 'Metoder', items: ['Design thinking', 'Co-creation', 'Håndtegning'] },
  ],
  awards: [{ title: 'Legatmodtager', desc: "HK/Privats Ophavsretsfond for afgangsprojekt", year: '2023', testimonialHref: '/cv/udtalelser?i=6', projectHref: '/projekter/ba-afgangs-eksamen' }],
  expLabel: 'Arbejdserfaring', eduLabel: 'Uddannelser', kurserLabel: 'Kurser', volLabel: 'Frivilligt arbejde', skillsLabel: 'Færdigheder', awardsLabel: 'Udmærkelser',
  seeRef: 'Se udtalelse →', seeProject: 'Se projekt →', seeExternal: 'Besøg website →', allRefs: 'Se alle udtalelser →',
  downloadCv: 'Download CV (PDF) ↓',
}

const DEFAULT_EN = {
  intro: 'Visual communication designer, graduated from Designskolen Kolding in 2023. Experience from publishing, media, and freelance work spanning graphic design, illustration, and art direction.',
  exp: [
    { role: 'Graphic Designer & Illustrator', type: 'Freelance', place: 'Flaneur', period: '2024', projectHref: '/projekter/flaneur' },
    { role: 'Freelance design', type: '', place: 'Videnskab.dk', period: '2024', projectHref: '/projekter/huslaegens-bord-podcast' },
    { role: 'Illustrator', type: 'Freelance', place: 'KFUM&KFUK', period: '2023', projectHref: '/projekter/kfum-kfuk' },
    { role: 'Graphic Designer', type: 'Freelance', place: 'BOOKLAB Forlag', period: '2022-2023', testimonialHref: '/cv/udtalelser?i=1', projectHref: '/projekter/booklab' },
    { role: 'Freelance Illustrator', type: 'Permanent', place: 'Aarhus Universitetsforlag', period: '2022-2023' },
    { role: 'Junior Art Director & Graphic Editor', type: '', place: 'Vid&Sans', period: '2021-2022', testimonialHref: '/cv/udtalelser?i=0', externalHref: 'https://vidogsans.dk/', projectHref: '/projekter/vid-sans' },
    { role: 'Graphic Designer', type: 'Internship', place: 'BOOKLAB Forlag', period: '2022', testimonialHref: '/cv/udtalelser?i=1', projectHref: '/projekter/booklab' },
    { role: 'Teaching Assistant', type: '', place: 'Elev Youth Club', period: 'Dec. 2019-Jun. 2022', testimonialHref: '/cv/udtalelser?i=4' },
    { role: 'Nanny', type: '', place: 'Private', period: 'Sep. 2019-Jan. 2021' },
    { role: 'Furniture Designer', type: 'Internship', place: 'Dahl Limited / Njord', period: '2019', testimonialHref: '/cv/udtalelser?i=3' },
    { role: 'Teaching Assistant', type: '', place: 'Bording Nursery', period: 'Apr. 2018-Sep. 2018' },
    { role: 'Garden Centre Worker', type: '', place: 'Hageland, Stiklestad, Norway', period: 'Jun. 2015-Aug. 2015' },
  ],
  edu: [
    { title: 'Designskolen Kolding', place: 'BA in Communication Design', period: '2020-2023', projectHref: '/projekter/ba-afgangs-eksamen' },
    { title: 'Design Technologist, Furniture Design', place: 'TEKO', period: '2018-2020' },
    { title: 'HF-Design', place: 'Herning HF', period: '2015-2017' },
  ],
  kurser: [
    { title: 'DR Lab', place: 'DR', period: '2021' },
    { title: 'Graphics course', place: 'Aarhus Art Academy', period: '2020' },
    { title: 'Højskole', place: 'Testrup Højskole', period: '2017' },
  ],
  vol: [
    { role: 'Photography and illustration', place: 'VeloMore', period: '2024-2025', projectHref: '/projekter/velo-magazine' },
    { role: 'Board member, marketing', place: 'SportX', period: 'From 2023', projectHref: '/projekter/sportx' },
    { role: 'Board chair', place: 'Floorball Club Ciconia', period: 'From 2022' },
    { role: 'Board member, communications', place: 'Aarhus Børnehøjskole', period: 'From 2022', testimonialHref: '/cv/udtalelser?i=2', projectHref: '/projekter/aarhus-bornehojskole' },
    { role: 'Teacher, creative subjects', place: 'Aarhus Børnehøjskole', period: '2018-2020' },
  ],
  skillGroups: [
    { name: 'Software', items: ['InDesign', 'Illustrator', 'Photoshop', 'Premiere Pro', 'After Effects', 'Figma', 'ProCreate', 'Blender', 'Rhino'] },
    { name: 'Disciplines', items: ['Visual identity', 'Illustration', 'UX · UI', 'Art direction', 'Concept development', 'Photography', '3D drawing'] },
    { name: 'Methods', items: ['Design thinking', 'Co-creation', 'Hand drawing'] },
  ],
  awards: [{ title: 'Grant recipient', desc: "HK/Privats Ophavsretsfond, graduation project", year: '2023', testimonialHref: '/cv/udtalelser?i=6', projectHref: '/projekter/ba-afgangs-eksamen' }],
  expLabel: 'Work experience', eduLabel: 'Education', kurserLabel: 'Courses', volLabel: 'Voluntary work', skillsLabel: 'Skills', awardsLabel: 'Awards',
  seeRef: 'See reference →', seeProject: 'See project →', seeExternal: 'Visit website →', allRefs: 'See all references →',
  downloadCv: 'Download CV (PDF) ↓',
}

function buildT(d: any) {
  const mapExp = (items: any[], lang: 'da' | 'en') => items.map((e: any) => ({
    role: lang === 'da' ? (e.role ?? '') : (e.roleEn ?? e.role ?? ''),
    type: lang === 'da' ? (e.type ?? '') : (e.typeEn ?? e.type ?? ''),
    place: e.place ?? '',
    period: lang === 'da' ? (e.period ?? '') : (e.periodEn ?? e.period ?? ''),
    testimonialHref: e.testimonialHref,
    projectHref: e.projectHref,
    externalHref: e.externalHref,
  }))
  const mapEdu = (items: any[], lang: 'da' | 'en') => items.map((e: any) => ({
    title: e.title ?? '',
    place: lang === 'da' ? (e.place ?? '') : (e.placeEn ?? e.place ?? ''),
    period: e.period ?? '',
    projectHref: e.projectHref,
  }))
  const mapVol = (items: any[], lang: 'da' | 'en') => items.map((e: any) => ({
    role: lang === 'da' ? (e.role ?? '') : (e.roleEn ?? e.role ?? ''),
    place: e.place ?? '',
    period: lang === 'da' ? (e.period ?? '') : (e.periodEn ?? e.period ?? ''),
    testimonialHref: e.testimonialHref,
    projectHref: e.projectHref,
  }))
  const mapSkills = (items: any[], lang: 'da' | 'en') => items.map((g: any) => ({
    name: lang === 'da' ? (g.name ?? '') : (g.nameEn ?? g.name ?? ''),
    items: g.items ?? [],
  }))
  const mapAwards = (items: any[], lang: 'da' | 'en') => items.map((a: any) => ({
    title: lang === 'da' ? (a.title ?? '') : (a.titleEn ?? a.title ?? ''),
    desc: lang === 'da' ? (a.desc ?? '') : (a.descEn ?? a.desc ?? ''),
    year: a.year ?? '',
    testimonialHref: a.testimonialHref,
    projectHref: a.projectHref,
  }))

  return {
    da: {
      ...DEFAULT_DA,
      intro: d.intro ?? DEFAULT_DA.intro,
      exp: d.exp ? mapExp(d.exp, 'da') : DEFAULT_DA.exp,
      edu: d.edu ? mapEdu(d.edu, 'da') : DEFAULT_DA.edu,
      kurser: d.kurser ? mapEdu(d.kurser, 'da') : DEFAULT_DA.kurser,
      vol: d.vol ? mapVol(d.vol, 'da') : DEFAULT_DA.vol,
      skillGroups: d.skillGroups ? mapSkills(d.skillGroups, 'da') : DEFAULT_DA.skillGroups,
      awards: d.awards ? mapAwards(d.awards, 'da') : DEFAULT_DA.awards,
    },
    en: {
      ...DEFAULT_EN,
      intro: d.introEn ?? DEFAULT_EN.intro,
      exp: d.exp ? mapExp(d.exp, 'en') : DEFAULT_EN.exp,
      edu: d.edu ? mapEdu(d.edu, 'en') : DEFAULT_EN.edu,
      kurser: d.kurser ? mapEdu(d.kurser, 'en') : DEFAULT_EN.kurser,
      vol: d.vol ? mapVol(d.vol, 'en') : DEFAULT_EN.vol,
      skillGroups: d.skillGroups ? mapSkills(d.skillGroups, 'en') : DEFAULT_EN.skillGroups,
      awards: d.awards ? mapAwards(d.awards, 'en') : DEFAULT_EN.awards,
    },
  }
}

export function CVClient({ sanityData }: { sanityData: any }) {
  const { lang } = useLang()
  const t = sanityData ? buildT(sanityData)[lang] : (lang === 'da' ? DEFAULT_DA : DEFAULT_EN)

  // /cv?print=1 → åbn browserens print-dialog (Gem som PDF)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('print') === '1') {
      const timer = setTimeout(() => window.print(), 700)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <main className="px-8 pt-14 sm:px-14">
      <div className="mb-12">
        <p className="mb-2 text-[10px] font-medium tracking-[0.22em] uppercase text-text-3">{lang === 'da' ? 'CV' : 'CV'}</p>
        <h1 className="mb-5 text-[13px] font-[450] tracking-tight text-text">Ruth-Anne Dausell</h1>
        <p className="max-w-md text-[12px]/[1.85] text-text-2">{t.intro}</p>
        <button
          onClick={() => (sanityData?.pdfUrl ? downloadCv(sanityData.pdfUrl) : window.print())}
          className="print-hidden mt-5 inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[11px] text-text-2 transition-colors duration-150 hover:border-border-2 hover:text-text"
        >
          {t.downloadCv}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_180px]">

        <div className="space-y-12">
          <motion.div {...fadeUp(0)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.expLabel}</p>
            <ul className="divide-y divide-border border-t border-border">
              {t.exp.map((e: any) => (
                <li key={e.role + e.period} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">
                      {e.role}
                      {e.type && <span className="ml-1.5 text-[10px] font-normal text-text-3">({e.type})</span>}
                    </p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{e.place}</p>
                      {e.testimonialHref && <Link href={e.testimonialHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeRef}</Link>}
                      {e.projectHref && <Link href={e.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeProject}</Link>}
                      {e.externalHref && <a href={e.externalHref} target="_blank" rel="noopener noreferrer" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeExternal}</a>}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.06)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.eduLabel}</p>
            <ul className="divide-y divide-border border-t border-border">
              {t.edu.map((e: any) => (
                <li key={e.title} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">{e.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{e.place}</p>
                      {e.projectHref && <Link href={e.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeProject}</Link>}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.08)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.kurserLabel}</p>
            <ul className="divide-y divide-border border-t border-border">
              {t.kurser.map((e: any) => (
                <li key={e.title} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">{e.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{e.place}</p>
                      {e.projectHref && <Link href={e.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeProject}</Link>}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{e.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.volLabel}</p>
            <ul className="divide-y divide-border border-t border-border">
              {t.vol.map((v: any) => (
                <li key={v.role + v.place} className="grid grid-cols-[1fr_auto] gap-6 py-3.5">
                  <div>
                    <p className="text-[12px] font-[450] text-text">{v.role}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                      <p className="text-[11px] text-text-2">{v.place}</p>
                      {v.testimonialHref && <Link href={v.testimonialHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeRef}</Link>}
                      {v.projectHref && <Link href={v.projectHref} className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeProject}</Link>}
                    </div>
                  </div>
                  <p className="shrink-0 pt-0.5 text-[10px] text-text-3">{v.period}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.04)} className="space-y-10">
          <div>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.skillsLabel}</p>
            <div className="space-y-7">
              {t.skillGroups.map((group: any) => (
                <div key={group.name}>
                  <p className="mb-2.5 text-[9px] text-text-3">{group.name}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((item: string) => (
                      <li key={item} className="text-[11px] text-text-2">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-[9px] font-medium tracking-[0.18em] uppercase text-text-3">{t.awardsLabel}</p>
            <ul className="space-y-4">
              {t.awards.map((a: any) => (
                <li key={a.title}>
                  <p className="text-[12px] font-[450] text-text">{a.title}</p>
                  <p className="mt-0.5 text-[10px]/[1.6] text-text-2">{a.desc}</p>
                  <p className="mt-0.5 text-[10px] text-text-3">{a.year}</p>
                  {a.testimonialHref && <Link href={a.testimonialHref} className="mt-1 block text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeRef}</Link>}
                  {a.projectHref && <Link href={a.projectHref} className="mt-0.5 block text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">{t.seeProject}</Link>}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Link href="/cv/udtalelser" className="text-[10px] text-text-3 transition-opacity duration-150 hover:opacity-50">
              {t.allRefs}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
