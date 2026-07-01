import { getUdtalelser } from '@/lib/data'
import { UdtalelserClient } from './_client'

const STATIC_DOCS = [
  { source: 'Vid&Sans', author: 'Søren Schultz Jørgensen', role: 'Chefredaktør', year: '2022', fileUrl: '/Til%20CV/UdtalelseFraVid%26Sans.pdf', isPdf: true },
  { source: 'BOOK LAB Forlag', author: 'Søren Hørdum', role: 'Forlagschef', year: '2022', fileUrl: '/Til%20CV/Anbefaling%20-%20Ruth-Anne.pdf', isPdf: true },
  { source: 'Aarhus Børnehøjskole', author: 'Thomas Krøyer', role: 'Forstander', year: '2023', fileUrl: '/Til%20CV/Anbefaling-Ruth-Anne-Degn-Dausell.pdf', isPdf: true },
  { source: 'Dahl Limited · Njordec', author: 'Kenneth Dahl', role: '', year: '2020', fileUrl: '/Til%20CV/Udtalelse_dahllimeted.pdf', isPdf: true },
  { source: 'Elev Ungdomsklub', author: 'Jacob Mohr Jensen', role: 'Klubleder', year: '2021', fileUrl: '/Til%20CV/euk-udtalelse.pdf', isPdf: true },
  { source: 'Dansk Wilton', author: 'Lone Ditmer', role: 'Marketing Manager', year: '2020', fileUrl: '/Til%20CV/Anbefaling_DanskWilton.pdf', isPdf: true },
  { source: 'HK/Privats Ophavsretsfond', author: 'Legatudtalelse', role: 'Afgangsprojekt 2023', year: '2023', fileUrl: '/Til%20CV/Legat%20udtalelse.png', isPdf: false },
]

export default async function UdtalelserPage() {
  const sanityDocs = await getUdtalelser()

  const docs = sanityDocs
    ? sanityDocs.map(d => ({
        source: d.source ?? '',
        author: d.author ?? '',
        role: d.role ?? '',
        year: d.year ?? '',
        fileUrl: d.fileUrl ?? '',
        isPdf: d.mimeType === 'application/pdf',
      }))
    : STATIC_DOCS

  return <UdtalelserClient docs={docs} />
}
