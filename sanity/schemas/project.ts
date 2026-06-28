import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Projekt',
  type: 'document',
  groups: [
    { name: 'tekst', title: 'Tekst', default: true },
    { name: 'billeder', title: 'Billeder' },
    { name: 'links', title: 'Links' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (dansk)',
      type: 'string',
      group: 'tekst',
      validation: r => r.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (english)',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      group: 'tekst',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'tekst',
      options: {
        list: [
          { title: 'Branding', value: 'branding' },
          { title: 'Illustration', value: 'illustration' },
          { title: 'UX · UI', value: 'ux-ui' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'year',
      title: 'År',
      type: 'string',
      group: 'tekst',
    }),
    defineField({
      name: 'body',
      title: 'Beskrivelse (dansk) — ét afsnit per blok',
      type: 'array',
      group: 'tekst',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        marks: { decorators: [], annotations: [] },
      }],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Description (english) — one paragraph per block',
      type: 'array',
      group: 'tekst',
      of: [{
        type: 'block',
        styles: [{ title: 'Normal', value: 'normal' }],
        marks: { decorators: [], annotations: [] },
      }],
    }),
    defineField({
      name: 'cover',
      title: 'Forsidebillede',
      type: 'image',
      group: 'billeder',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Galleribilleder',
      type: 'array',
      group: 'billeder',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'externalLink',
      title: 'Link til website',
      type: 'url',
      group: 'links',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Rækkefølge (laveste tal vises først)',
      type: 'number',
      group: 'tekst',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'cover' },
  },
})
