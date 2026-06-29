import { defineField, defineType } from 'sanity'

const expItem = {
  type: 'object' as const,
  fields: [
    { name: 'role', title: 'Titel (DA)', type: 'string' },
    { name: 'roleEn', title: 'Title (EN)', type: 'string' },
    { name: 'type', title: 'Type (DA) — Freelance, Praktik etc.', type: 'string' },
    { name: 'typeEn', title: 'Type (EN)', type: 'string' },
    { name: 'place', title: 'Sted', type: 'string' },
    { name: 'period', title: 'Periode (DA)', type: 'string' },
    { name: 'periodEn', title: 'Period (EN)', type: 'string' },
    { name: 'testimonialHref', title: 'Link til udtalelse (fx /cv/udtalelser?i=0)', type: 'string' },
    { name: 'projectHref', title: 'Link til projekt (fx /projekter/flaneur)', type: 'string' },
    { name: 'externalHref', title: 'Eksternt link', type: 'url' },
  ],
  preview: { select: { title: 'role', subtitle: 'place' } },
}

const eduItem = {
  type: 'object' as const,
  fields: [
    { name: 'title', title: 'Uddannelse', type: 'string' },
    { name: 'place', title: 'Sted/linje (DA)', type: 'string' },
    { name: 'placeEn', title: 'Place/line (EN)', type: 'string' },
    { name: 'period', title: 'Periode', type: 'string' },
    { name: 'projectHref', title: 'Link til projekt', type: 'string' },
  ],
  preview: { select: { title: 'title', subtitle: 'place' } },
}

const volItem = {
  type: 'object' as const,
  fields: [
    { name: 'role', title: 'Rolle (DA)', type: 'string' },
    { name: 'roleEn', title: 'Role (EN)', type: 'string' },
    { name: 'place', title: 'Sted', type: 'string' },
    { name: 'period', title: 'Periode (DA)', type: 'string' },
    { name: 'periodEn', title: 'Period (EN)', type: 'string' },
    { name: 'testimonialHref', title: 'Link til udtalelse', type: 'string' },
  ],
  preview: { select: { title: 'role', subtitle: 'place' } },
}

const skillGroup = {
  type: 'object' as const,
  fields: [
    { name: 'name', title: 'Gruppenavn (DA)', type: 'string' },
    { name: 'nameEn', title: 'Group name (EN)', type: 'string' },
    { name: 'items', title: 'Færdigheder', type: 'array', of: [{ type: 'string' }] },
  ],
  preview: { select: { title: 'name' } },
}

const awardItem = {
  type: 'object' as const,
  fields: [
    { name: 'title', title: 'Titel (DA)', type: 'string' },
    { name: 'titleEn', title: 'Title (EN)', type: 'string' },
    { name: 'desc', title: 'Beskrivelse (DA)', type: 'string' },
    { name: 'descEn', title: 'Description (EN)', type: 'string' },
    { name: 'year', title: 'År', type: 'string' },
    { name: 'testimonialHref', title: 'Link til udtalelse', type: 'string' },
  ],
  preview: { select: { title: 'title', subtitle: 'year' } },
}

export const cvSchema = defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  groups: [
    { name: 'text', title: 'Tekst', default: true },
    { name: 'exp', title: 'Erfaring' },
    { name: 'edu', title: 'Uddannelse' },
    { name: 'vol', title: 'Frivilligt' },
    { name: 'skills', title: 'Færdigheder' },
  ],
  fields: [
    defineField({ name: 'intro', title: 'Intro (DA)', type: 'text', rows: 3, group: 'text' }),
    defineField({ name: 'introEn', title: 'Intro (EN)', type: 'text', rows: 3, group: 'text' }),
    defineField({ name: 'exp', title: 'Arbejdserfaring', type: 'array', group: 'exp', of: [expItem] }),
    defineField({ name: 'edu', title: 'Uddannelse', type: 'array', group: 'edu', of: [eduItem] }),
    defineField({ name: 'vol', title: 'Frivilligt arbejde', type: 'array', group: 'vol', of: [volItem] }),
    defineField({ name: 'skillGroups', title: 'Færdigheder', type: 'array', group: 'skills', of: [skillGroup] }),
    defineField({ name: 'awards', title: 'Udmærkelser', type: 'array', group: 'skills', of: [awardItem] }),
  ],
  preview: { select: { title: 'intro' }, prepare: () => ({ title: 'CV' }) },
})
