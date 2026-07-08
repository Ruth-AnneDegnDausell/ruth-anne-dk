import { defineField, defineType } from 'sanity'

export const projektKategoriSchema = defineType({
  name: 'projektKategori',
  title: 'Projekt-kategori',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (bruges i filteret, fx "branding")', type: 'string', validation: r => r.required() }),
    defineField({ name: 'label', title: 'Navn (dansk)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'labelEn', title: 'Name (english)', type: 'string' }),
  ],
  preview: { select: { title: 'label', subtitle: 'slug' } },
})
