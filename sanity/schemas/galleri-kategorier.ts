import { defineField, defineType } from 'sanity'

export const fotoKategoriSchema = defineType({
  name: 'fotoKategori',
  title: 'Fotografi-kategori',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (bruges i URL, fx "velomore")', type: 'string', validation: r => r.required() }),
    defineField({ name: 'label', title: 'Navn (dansk)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'labelEn', title: 'Name (english)', type: 'string' }),
  ],
  preview: { select: { title: 'label', subtitle: 'slug' } },
})

export const illKategoriSchema = defineType({
  name: 'illKategori',
  title: 'Illustration-kategori',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug (bruges i URL, fx "cykel")', type: 'string', validation: r => r.required() }),
    defineField({ name: 'label', title: 'Navn (dansk)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'labelEn', title: 'Name (english)', type: 'string' }),
  ],
  preview: { select: { title: 'label', subtitle: 'slug' } },
})
