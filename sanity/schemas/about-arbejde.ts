import { defineField, defineType } from 'sanity'

export const aboutArbejdeSchema = defineType({
  name: 'aboutArbejde',
  title: 'Om mig · Arbejde',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
  ],
  fields: [
    defineField({
      name: 'bio1',
      title: 'Intro-afsnit (DA)',
      type: 'text',
      rows: 4,
      group: 'da',
    }),
    defineField({
      name: 'bio2',
      title: 'Andet afsnit (DA)',
      type: 'text',
      rows: 5,
      group: 'da',
    }),
    defineField({
      name: 'services',
      title: 'Hvad jeg laver (DA)',
      type: 'array',
      group: 'da',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'string' },
            { name: 'desc', title: 'Beskrivelse', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
    }),
    defineField({
      name: 'bio1En',
      title: 'Intro paragraph (EN)',
      type: 'text',
      rows: 4,
      group: 'en',
    }),
    defineField({
      name: 'bio2En',
      title: 'Second paragraph (EN)',
      type: 'text',
      rows: 5,
      group: 'en',
    }),
    defineField({
      name: 'servicesEn',
      title: 'What I do (EN)',
      type: 'array',
      group: 'en',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'string' },
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'bio1' }, prepare: () => ({ title: 'Om mig · Arbejde' }) },
})
