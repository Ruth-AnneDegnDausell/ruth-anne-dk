export type Category = 'branding' | 'illustration' | 'ux-ui'

export interface Project {
  id: number
  slug: string
  category: Category
  categoryLabel: string
  categoryLabelEn: string
  title: string
  titleEn: string
  year: string
  desc: string
  descEn: string
  body: string[]
  bodyEn: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'nordisk-cykelklub',
    category: 'branding',
    categoryLabel: 'Branding',
    categoryLabelEn: 'Branding',
    title: 'Nordisk Cykelklub · Visuel identitet',
    titleEn: 'Nordic Cycling Club · Visual Identity',
    year: '2024',
    desc: 'Komplet visuel identitet for nordisk cykelklub med fokus på enkelhed og bevægelse.',
    descEn: 'Complete visual identity for a Nordic cycling club, focused on simplicity and movement.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.',
      'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Nordisk Cykelklub project.',
      'The identity was developed over three months in close collaboration with the club leadership, resulting in a flexible visual system that works across print, digital, and motion.',
      'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    ],
  },
  {
    id: 2,
    slug: 'tour-de-france',
    category: 'illustration',
    categoryLabel: 'Illustration',
    categoryLabelEn: 'Illustration',
    title: 'Tour de France · Etapeillustration serie',
    titleEn: 'Tour de France · Stage Illustration Series',
    year: '2023',
    desc: 'Serie af illustrationer til Tour de France etapeprogram. Kombinerer analog og digital teknik.',
    descEn: 'A series of illustrations for the Tour de France stage programme, combining analogue and digital techniques.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel eros at nunc tincidunt interdum vel ut odio. Curabitur consequat tortor vel nibh suscipit, nec dapibus eros cursus.',
      'Pellentesque auctor neque nec urna interdum, non tincidunt felis dignissim. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
      'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Tour de France illustration project.',
      'Each stage illustration was created to capture the unique character of the route — the landscape, the culture, and the drama of professional cycling.',
      'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
    ],
  },
  {
    id: 3,
    slug: 'sportstracker',
    category: 'ux-ui',
    categoryLabel: 'UX · UI',
    categoryLabelEn: 'UX · UI',
    title: 'Sportstracker · Interface design',
    titleEn: 'Sportstracker · Interface Design',
    year: '2024',
    desc: 'Komplet interface design for sportsapplikation med fokus på brugervenlighed og datavisualisering.',
    descEn: 'Complete interface design for a sports application, focused on usability and data visualisation.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
      'Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus. Curabitur aliquet quam id dui posuere blandit.',
      'Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Sportstracker project.',
      'The design system was built from scratch, with a focus on legibility and quick scanning of key metrics during physical activity.',
      'Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
    ],
  },
  {
    id: 4,
    slug: 'koge-bugt-fc',
    category: 'branding',
    categoryLabel: 'Branding',
    categoryLabelEn: 'Branding',
    title: 'Køge Bugt FC · Sæsonkampagne',
    titleEn: 'Køge Bugt FC · Season Campaign',
    year: '2023',
    desc: 'Visuel kampagne for lokal fodboldklub med fokus på lokal forankring og fællesskab.',
    descEn: 'Visual campaign for a local football club, focused on community connection and shared identity.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
      'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque.',
      'Convallis posuere morbi leo urna molestie at elementum eu facilisis. Amet nisl suscipit adipiscing bibendum est ultricies integer quis.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Køge Bugt FC campaign.',
      'The campaign ran across print, outdoor, and social media, with a visual language rooted in the local community.',
      'Amet nisl suscipit adipiscing bibendum est ultricies integer quis.',
    ],
  },
  {
    id: 5,
    slug: 'velo-magazine',
    category: 'illustration',
    categoryLabel: 'Illustration',
    categoryLabelEn: 'Illustration',
    title: 'Velo Magazine · Editorial illustration',
    titleEn: 'Velo Magazine · Editorial Illustration',
    year: '2024',
    desc: 'Månedlige illustrationer til cykelmagasin med portræt og editorial karakter.',
    descEn: 'Monthly illustrations for a cycling magazine, with a portrait and editorial character.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, nunc at ultricies luctus, nunc nunc ultricies nunc.',
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Velo Magazine project.',
      'Each monthly illustration captures a different facet of cycling culture — from racing drama to the quiet pleasure of the weekend ride.',
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    ],
  },
  {
    id: 6,
    slug: 'traeningsplatform',
    category: 'ux-ui',
    categoryLabel: 'UX · UI',
    categoryLabelEn: 'UX · UI',
    title: 'Træningsplatform · Dashboard design',
    titleEn: 'Training Platform · Dashboard Design',
    year: '2022',
    desc: 'Data dashboard for personlig træningsplatform med realtidsopdateringer og analyseværktøjer.',
    descEn: 'Data dashboard for a personal training platform with real-time updates and analysis tools.',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh.',
      'Cras ultricies ligula sed magna dictum porta. Donec sollicitudin molestie malesuada. Pellentesque in ipsum id orci porta dapibus.',
      'Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.',
    ],
    bodyEn: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder English content for the Træningsplatform project.',
      'The dashboard was designed to surface the most relevant data at a glance, with a clear hierarchy that works across mobile and desktop.',
      'Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed.',
    ],
  },
]
