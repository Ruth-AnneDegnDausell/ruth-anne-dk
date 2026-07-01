import { defineField, defineType } from 'sanity'

const udtalelseItem = {
  type: 'object' as const,
  name: 'udtalelseItem',
  title: 'Udtalelse',
  preview: {
    select: { source: 'source', author: 'author', year: 'year' },
    prepare({ source, author, year }: { source?: string; author?: string; year?: string }) {
      return { title: source ?? author ?? '(uden titel)', subtitle: [author, year].filter(Boolean).join(' · ') }
    },
  },
  fields: [
    defineField({ name: 'source', title: 'Organisation', type: 'string' }),
    defineField({ name: 'author', title: 'Navn / undertitel', type: 'string' }),
    defineField({ name: 'role', title: 'Stilling', type: 'string' }),
    defineField({ name: 'year', title: 'År', type: 'string' }),
    defineField({
      name: 'file',
      title: 'PDF eller billede',
      description: 'Upload PDF-udtalelse eller billede af udtalelsen.',
      type: 'file',
      options: { accept: '.pdf,.png,.jpg,.jpeg,.webp' },
    }),
  ],
}

export const udtalelserSchema = defineType({
  name: 'udtalelser',
  title: 'Udtalelser',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Udtalelser',
      description: 'Træk for at ændre rækkefølge.',
      type: 'array',
      of: [udtalelseItem],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Udtalelser' }),
  },
})
