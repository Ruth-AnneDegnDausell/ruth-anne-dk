import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })
async function run() {
  await client.patch('forside').set({
    contrib: [
      'Visuel identitet og branding',
      'Grafisk opsætning og layout',
      'Content til hjemmeside og sociale medier',
      'Tekst, tone of voice og formidling',
      'Research og strukturering af komplekst materiale',
      'Præsentationer, moodboards og visuelle oplæg',
      'Kreativ sparring og idéudvikling',
    ],
    contribEn: [
      'Visual identity and branding',
      'Graphic layout and typesetting',
      'Content for websites and social media',
      'Copy, tone of voice, and communication',
      'Research and structuring of complex material',
      'Presentations, moodboards, and visual pitches',
      'Creative sparring and idea development',
    ],
  }).commit()
  console.log('✓ forside: contrib')
  await client.patch('fleksjob').set({
    worksBest: [
      'Klare briefinger og tydelige prioriteringer',
      'Afgrænsede opgaver med realistiske deadlines',
      'Skriftlig kommunikation og faste check-ins',
      'Mulighed for hjemmearbejde og ro til fordybelse',
      'Opgaver hvor kvalitet, æstetik og struktur vægtes højt',
    ],
    worksBestEn: [
      'Clear briefs and distinct priorities',
      'Well-defined tasks with realistic deadlines',
      'Written communication and regular check-ins',
      'The option to work from home and space for deep focus',
      'Tasks where quality, aesthetics, and structure matter',
    ],
  }).commit()
  console.log('✓ fleksjob: worksBest')
}
run().catch(e => { console.error(e); process.exit(1) })
