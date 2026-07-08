import { defineField, defineType } from 'sanity'

const sectionFields = [
  { name: 'title', title: 'Overskrift', type: 'string' },
  { name: 'body', title: 'Brødtekst', type: 'text', rows: 5 },
  { name: 'list', title: 'Punktliste (valgfri)', type: 'array', of: [{ type: 'string' }] },
  { name: 'note', title: 'Note nederst (valgfri)', type: 'text', rows: 3 },
]

const linkFields = [
  { name: 'label', title: 'Tekst', type: 'string' },
  { name: 'href', title: 'Link (https://…)', type: 'string' },
]

export const ordningenSchema = defineType({
  name: 'ordningen',
  title: 'Fleksjob · Om ordningen',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Overskrift (DA)', type: 'string', group: 'da' }),
    defineField({ name: 'intro', title: 'Intro-tekst (DA)', type: 'text', rows: 4, group: 'da' }),
    defineField({
      name: 'sections',
      title: 'Afsnit (DA)',
      description: 'Træk for at ændre rækkefølgen.',
      type: 'array',
      group: 'da',
      of: [{
        type: 'object',
        fields: sectionFields,
        preview: { select: { title: 'title', subtitle: 'body' } },
      }],
    }),
    defineField({
      name: 'links',
      title: 'Eksterne links (DA)',
      type: 'array',
      group: 'da',
      of: [{
        type: 'object',
        fields: linkFields,
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),

    defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string', group: 'en' }),
    defineField({ name: 'introEn', title: 'Intro text (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({
      name: 'sectionsEn',
      title: 'Sections (EN)',
      type: 'array',
      group: 'en',
      of: [{
        type: 'object',
        fields: sectionFields,
        preview: { select: { title: 'title', subtitle: 'body' } },
      }],
    }),
    defineField({
      name: 'linksEn',
      title: 'External links (EN)',
      type: 'array',
      group: 'en',
      of: [{
        type: 'object',
        fields: linkFields,
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: () => ({ title: 'Fleksjob · Om ordningen' }) },
})
