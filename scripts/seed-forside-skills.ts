import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'eg5pmonq', dataset: 'production', apiVersion: '2025-06-28', token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN, useCdn: false, perspective: 'raw' })

const item = (k: string, title: string, desc: string) => ({ _key: k, _type: 'object', title, desc })

async function run() {
  await client.patch('forside').set({
    skills: [
      item('s0', 'Visuel identitet', 'Fra logo og farvepalette til typografi og brand guidelines. Sammenhængende identiteter der holder over tid og skiller sig ud i sit marked.'),
      item('s1', 'Illustration', 'Håndtegnede og digitale illustrationer til print, web og sociale medier. Specialiseret i sportsillustration, portræt og editorial grafik.'),
      item('s2', 'UX · UI design', 'Interface design med fokus på brugeroplevelse og tilgængelighed. Fra wireframes og prototyper til færdige UI-systemer klar til produktion.'),
      item('s3', 'Art direction', 'Kreativ ledelse af visuelle projekter fra konceptudvikling til produktion. Arbejder tæt med fotografer, illustratorer og producenter.'),
    ],
    skillsEn: [
      item('s0', 'Visual identity', 'From logo and colour palette to typography and brand guidelines. Coherent identities that hold up over time and stand out in their market.'),
      item('s1', 'Illustration', 'Hand-drawn and digital illustrations for print, web, and social media. Specialised in sports illustration, portrait, and editorial graphics.'),
      item('s2', 'UX · UI design', 'Interface design focused on user experience and accessibility. From wireframes and prototypes to finished UI systems ready for production.'),
      item('s3', 'Art direction', 'Creative direction of visual projects from concept development to production. Works closely with photographers, illustrators, and producers.'),
    ],
  }).commit()
  console.log('✓ skills lagt ind på forside-dokumentet og publiceret')
}
run().catch(e => { console.error(e); process.exit(1) })
