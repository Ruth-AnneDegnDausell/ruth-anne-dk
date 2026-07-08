/**
 * Sets English translations (titleEn + bodyEn) on all project drafts and
 * publishes them (draft → published, draft deleted).
 *
 * Run: npx sanity exec scripts/translate-and-publish.ts --with-user-token
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'eg5pmonq',
  dataset: 'production',
  apiVersion: '2025-06-28',
  token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  perspective: 'raw',
})

const T: Record<string, { titleEn: string; paragraphs: string[] }> = {
  'project-aarhus-bornehojskole': {
    titleEn: 'Aarhus Børnehøjskole · Identity Design',
    paragraphs: [
      'Visual identity for Aarhus Børnehøjskole, an NGO and volunteer-run institution focused on creativity and community for children. Among other things, Aarhus Børnehøjskole offers after-school courses for children.',
      'The visual identity is a further development of an existing identity that had proven to lack several elements as well as consistency in use.',
      'My task was therefore to create a coherent identity that appears friendly and inviting without losing professionalism and credibility. The design had to appeal to both the children and their parents.',
      'The identity system is built around a playful, varied colour palette, a round and approachable typography, and flexible graphic elements that work across posters, brochures, and digital surfaces.',
      'The catalogue uses the system to its full extent and shows the range of the visual expression.',
      "The identity was developed with a strong focus on the fact that it would subsequently be taken over by a team of volunteers at Aarhus Børnehøjskole. The design guide therefore had to be developed, communicated, and handed over as a well-integrated system able to accommodate different levels and different creative people's use of the identity, while streamlining and framing a recognisable graphic line.",
    ],
  },
  'project-ba-afgangs-eksamen': {
    titleEn: 'Depositum · Bachelor Graduation Project',
    paragraphs: [
      "Depositum is my graduation project from my bachelor's degree in Communication Design at Designskolen Kolding, 2023.",
      "The project resulted in the design and production of a book, where the graphic layout, illustration, the texts in the book, the visual expression, and the concept and identity design were all developed from scratch. Following my exam, the project was awarded the annual grant from HK/Privat's Copyright Fund in recognition of its quality.",
      "The book's identity is built around a strong formal line. The overall design treats the book as an object with a coherent visual narrative.",
    ],
  },
  'project-booklab': {
    titleEn: 'BookLab · Book Photography',
    paragraphs: [
      'The project was created during my internship, which I completed as part of my degree in Communication Design at Designskolen Kolding.',
      "During my internship at the publishing house BookLab, one of my primary tasks was photographing books as independent objects. The task was to create evocative, atmospheric images that highlight the book's materiality and visual expression rather than simply documenting its content - capturing the books' physical, tactile sensuality and proportions in a digital format for web and social media.",
      'The images are designed for editorial and commercial use.',
    ],
  },
  'project-digitale-illustrationer': {
    titleEn: 'Digital Paintings and Drawings',
    paragraphs: [
      'A collection of digital paintings and drawings created in Procreate and Adobe Illustrator. The illustrations range from sketchy, expressive styles to more refined compositions, covering genres such as portrait, nature, and abstract work.',
      'Some of the illustrations were produced as commercial work for specific projects, companies, and brands, while others were created as personal experiments, pieces for digital media, or ways of learning new techniques.',
      'This series of illustrations shows the breadth of my digital illustration practice.',
    ],
  },
  'project-flaneur': {
    titleEn: 'Flaneur · Visual Identity and Communication',
    paragraphs: [
      "Flaneur is a bicycle shop in Aarhus with a workshop, café, and social rides - a place with a strong community and a distinct personality. I helped build the shop's visual identity from scratch: logo, colours, illustrations, typography, photo, and video.",
      "I worked all the way from early sketches and idea development to finished products ready for use. Illustration was the focal point, and the material was created to carry Flâneur's expression on social media, in the shop, and in print.",
    ],
  },
  'project-gobik': {
    titleEn: 'GOBIK · Cycling Jersey Design',
    paragraphs: [
      'The jersey was designed in connection with my work for Flâneur. It was created as a piece that would stand out and catch the eye - the attention was meant to create visibility for the brand.',
      'The design is built around a sunflower motif as the central graphic element. I painted the illustration during the Tour de France 2024, so it originates from one of my paintings - cut out and adapted for this jersey design.',
      'The project covered the entire process from idea and illustration to a mock-up showing the jersey on the body in a realistic context, and on to the final product.',
    ],
  },
  'project-grafisk-bog': {
    titleEn: 'Graphic Layout and Book Design',
    paragraphs: [
      "The project was set as part of my bachelor's degree in Communication Design at Designskolen Kolding.",
      'The brief was a defined task in which a given book had to be designed - both the graphic layout, with a focus on working with grid systems, as well as the cover design and the overall expression.',
      'The task had a particular focus on learning to design text and layout with readability, rhythm, and systems in mind.',
    ],
  },
  'project-jesus-would-bike': {
    titleEn: 'Jesus Would Bike · Poster Competition',
    paragraphs: [
      '"Jesus Would Bike" is a typographic poster created for a poster competition in collaboration with the Tour de France 2022. The poster ended up among the winners and was subsequently shown along the routes during the Tour de France and at the closing physical exhibition in Paris 2022.',
      "The poster's concept is based on a provocation: what would Jesus ride? The answer is the bicycle, and the visual expression underlines the point with a dark, raw aesthetic built on gothic typography, neon colours, and a metallic graphic halo.",
      'The result is a poster that stands out distinctly in the visual space.',
    ],
  },
  'project-kfum-kfuk': {
    titleEn: "KFUM&KFUK · Illustration for Children's Magazine",
    paragraphs: [
      "Illustrations for KFUM&KFUK's children's magazine. The task was to create lively, colourful illustrations that appeal to children and support the organisation's playful and inclusive tone.",
      'The work included a series of icons and elements for editorial use as well as a full-page "spot five differences" illustration with an MGP theme. The illustrations are drawn in a fresh, soft style suited to the target audience and the format of the medium.',
    ],
  },
  'project-komunale-losninger': {
    titleEn: 'Podcast Cover · Kommunale Løsninger',
    paragraphs: [
      'The project is a visual identity and illustration for a podcast about sustainability.',
      "The assignment was created for Videnslyd and the Municipality of Aarhus, who produced the podcast '2 fluer med 1 smæk' ('Two birds with one stone').",
      'The illustration is drawn with a light, humorous line that makes complex topics accessible and inviting to a broad audience.',
      'The cover design combines a strong typographic line with the digitally drawn flies.',
      'The colour palette is clear, bright, and open.',
      "The design reflects the podcast's content, and the visual narrative speaks to the same audience as the podcast's sound universe.",
    ],
  },
  'project-lp-cover': {
    titleEn: 'Hifalutin Lowly · LP Cover Design',
    paragraphs: [
      'The project is a fictional brief created as part of my bachelor\'s degree in Communication Design at Designskolen Kolding.\n\nThe cover was developed for the LP "Hifalutin Lowly". The design is based on three-dimensional, metallic 3D renders from the 3D programme Rhino. The concept builds on a touch of sci-fi and industrial aesthetics, reflecting the character of the music.',
      'The digitally rendered shapes are arranged in a typographic layout that leaves room for the album title and artist name without disturbing the visual drama. The cover is designed digitally and visualised as digital mock-ups.',
    ],
  },
  'project-piba': {
    titleEn: 'PIBA · Visual Presentation',
    paragraphs: [
      'Visual identity and presentation material for the fictional brand PIBA. The project covered logo design, identity, concept, presentation material, and graphic visualisations for use in communication and marketing.',
    ],
  },
  'project-ramtt': {
    titleEn: 'RAMTT · Identity Design',
    paragraphs: [
      'RAMTT is a digital platform where users can analyse their training data. For RAMTT I designed an eye-catching, dynamic visual identity. My task was to create a logo and a colour system that could be carried across disciplines, platforms, and levels of training ambition.',
      'The design had to accommodate a broad audience of professional cyclists, recreational athletes, runners, triathletes, and swimmers - and still appear as a coherent, strong identity that appeals to its users.',
      "The brand's visual identity is built thematically around data and the digital universe that is RAMTT's foundation. The design also focuses on the subtle parallel to speed, ambition, and endurance - the essence of sport.",
      'The logo works in a single colour against a monochrome photograph as well as in a system of colour variations that provides flexibility across apparel, digital surfaces, and event branding. It is a flexible system in which the design retains its recognisability.',
      'The result is an identity that carries the intensity of sport into the graphic expression.',
    ],
  },
  'project-sportx': {
    titleEn: 'SportX · Identity Design and Social Media',
    paragraphs: [
      'SportX is a sports community that I was once part of myself. During the same period, I helped further develop the existing graphic identity.',
      'The visual identity is based on a black background with neon green accent colours. The work primarily covered the production of social media content.',
      'The dark aesthetic and sharp neon colours give SportX a futuristic, digital expression that speaks to a young, sports-minded audience.',
    ],
  },
  'project-substrate': {
    titleEn: 'Substrate · Branding and Digital Identity',
    paragraphs: [
      'Substrate is a sports nutrition brand developing products for optimising athletic performance.',
      'The project included the development of a logo, a brand guide, and a complete digital identity tailored to a modern tech expression.',
      'The visual presentation is built on clarity and simplicity - an expression that communicates credibility and technical precision.',
    ],
  },
  'project-suhn-io': {
    titleEn: 'SUHN 10© · Branding and Packaging Design',
    paragraphs: [
      'SUHN IO© is a sports nutrition brand with a distinct, technological visual identity. The packaging design for the gel products combines a silver metallic material with subtle light blue typography and sharp product information, in an expression that stands out on the shelf among other sports nutrition brands. The design communicates efficiency, confidence, and quality.',
      'The project spans from packaging design to a merch line with a hoodie and other products, as well as web, logo, colours, and photo and video style.',
      'The graphic tone is minimalist and precise - it works consistently across the physical product and digital platforms.\n\nAll photo, video, and design material for SUHN IO© was created with a view to building a coherent, strong brand able to compete with the major players in the market the brand is entering.',
    ],
  },
  'project-velo-magazine': {
    titleEn: 'Velo Magazine · Editorial Illustration',
    paragraphs: [
      "A small series of editorial illustrations produced for 'VeloMore', a niche magazine about cycling.",
      'The illustrations range from portraits of professional cyclists to illustrations of the culture surrounding the sport.',
      'The illustrations combine hand-drawn character with a digital finish and are designed to work both as standalone pieces and alongside the editorial text.',
      'I also photographed two bicycles for presentation in the magazine.',
    ],
  },
  'project-vid-sans': {
    titleEn: 'Vid&Sans · Editorial Illustration and Layout',
    paragraphs: [
      'Vid&Sans was an editorial news outlet that existed for three years, focusing on research, philosophy, thinking, and society. It was owned and run by Aarhus University Press, where I was employed to develop the graphic line for Vid&Sans.',
      'My tasks consisted of creating illustrations and layout design for the publications, including portrait illustrations of philosophers and thinkers as well as collages for articles.',
      'I was also responsible for the overall visual direction of the outlet, including a brand guide to streamline the expression and the direction of its visual DNA across social media, print, and its own website.',
      'In addition, I developed ideas and concepts for the visual communication of news journalism.',
    ],
  },
  'project-videnskab-podcast': {
    titleEn: 'Videnskab.dk · Podcast Brand Guide',
    paragraphs: [
      "Brand guide and cover design for Videnskab.dk's podcast 'Huslægens Bord'.",
      'The task was to develop a coherent visual identity that communicates expertise and approachability at the same time. A key element of the cover was creating a frame that subtly contains a reference to skin. The solution was based on a pattern originally derived from a skin cell structure.',
      'The final guide defines the colour palette and graphic elements for use across podcast platforms and social media.',
    ],
  },
}

const toBlocks = (paragraphs: string[]) =>
  paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `en${i}`,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `en${i}s`, text, marks: [] }],
  }))

async function run() {
  const drafts = await client.fetch<any[]>(`*[_id in path("drafts.**") && _type == "project"]`)
  console.log(`${drafts.length} kladder fundet`)

  const tx = client.transaction()
  let published = 0
  for (const draft of drafts) {
    const pubId = draft._id.replace(/^drafts\./, '')
    const tr = T[pubId]
    if (!tr) { console.log(`  ⚠ ingen oversættelse for ${pubId} - springes over`); continue }

    const { _id, _rev, _createdAt, _updatedAt, ...content } = draft
    tx.createOrReplace({
      ...content,
      _id: pubId,
      titleEn: tr.titleEn,
      bodyEn: toBlocks(tr.paragraphs),
    })
    tx.delete(draft._id)
    published++
    console.log(`  ✓ ${pubId}`)
  }

  await tx.commit()
  console.log(`\n✓ ${published} projekter oversat og publiceret`)
}

run().catch(err => { console.error(err); process.exit(1) })
