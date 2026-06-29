import { defineField, defineType } from 'sanity'

export const kontaktSchema = defineType({
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
  ],
  fields: [
    defineField({ name: 'heading', title: 'Overskrift (DA)', type: 'string', group: 'da' }),
    defineField({ name: 'intro', title: 'Intro-tekst (DA)', type: 'text', rows: 2, group: 'da' }),
    defineField({
      name: 'channels',
      title: 'Kontaktkanaler (DA)',
      type: 'array',
      group: 'da',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Label', type: 'string' },
          { name: 'value', title: 'Visningsværdi', type: 'string' },
          { name: 'href', title: 'Link (mailto:… / tel:… / https://…)', type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'value' } },
      }],
    }),
    defineField({ name: 'availability', title: 'Tilgængelighed-tekst (DA)', type: 'string', group: 'da' }),
    defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string', group: 'en' }),
    defineField({ name: 'introEn', title: 'Intro text (EN)', type: 'text', rows: 2, group: 'en' }),
    defineField({
      name: 'channelsEn',
      title: 'Contact channels (EN)',
      type: 'array',
      group: 'en',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Label', type: 'string' },
          { name: 'value', title: 'Display value', type: 'string' },
          { name: 'href', title: 'Link', type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'value' } },
      }],
    }),
    defineField({ name: 'availabilityEn', title: 'Availability text (EN)', type: 'string', group: 'en' }),
  ],
  preview: { select: { title: 'heading' }, prepare: () => ({ title: 'Kontakt' }) },
})
