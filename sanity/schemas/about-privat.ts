import { defineField, defineType } from 'sanity'

export const aboutPrivatSchema = defineType({
  name: 'aboutPrivat',
  title: 'Om mig · Privat',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
    { name: 'billeder', title: 'Billeder' },
  ],
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro-sætning (DA)',
      type: 'string',
      group: 'da',
    }),
    defineField({
      name: 'body1',
      title: 'Første afsnit (DA)',
      type: 'text',
      rows: 5,
      group: 'da',
    }),
    defineField({
      name: 'body2',
      title: 'Andet afsnit (DA)',
      type: 'text',
      rows: 4,
      group: 'da',
    }),
    defineField({
      name: 'inspirations',
      title: 'Hvad der fylder i hverdagen (DA)',
      type: 'array',
      group: 'da',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'introEn',
      title: 'Intro sentence (EN)',
      type: 'string',
      group: 'en',
    }),
    defineField({
      name: 'body1En',
      title: 'First paragraph (EN)',
      type: 'text',
      rows: 5,
      group: 'en',
    }),
    defineField({
      name: 'body2En',
      title: 'Second paragraph (EN)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),
    defineField({
      name: 'inspirationsEn',
      title: 'What fills my days (EN)',
      type: 'array',
      group: 'en',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'photo',
      title: 'Personligt billede',
      description: 'Personligt billede · anbefalet min. 1200 × 900 px',
      type: 'image',
      group: 'billeder',
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: 'intro' }, prepare: () => ({ title: 'Om mig · Privat' }) },
})
