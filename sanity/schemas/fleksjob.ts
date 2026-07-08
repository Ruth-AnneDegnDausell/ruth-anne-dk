import { defineField, defineType } from 'sanity'

const paragraphBlock = {
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }],
  marks: { decorators: [], annotations: [] },
}

export const fleksjobSchema = defineType({
  name: 'fleksjob',
  title: 'Fleksjob',
  type: 'document',
  groups: [
    { name: 'da', title: 'Dansk', default: true },
    { name: 'en', title: 'English' },
    { name: 'ordningen', title: 'Om ordningen' },
  ],
  fields: [
    // Dansk
    defineField({ name: 'heading', title: 'Overskrift (DA)', type: 'string', group: 'da' }),
    defineField({ name: 'p1', title: 'Afsnit 1 (DA)', type: 'text', rows: 3, group: 'da' }),
    defineField({ name: 'p2', title: 'Afsnit 2 (DA)', type: 'text', rows: 5, group: 'da' }),
    defineField({ name: 'p3', title: 'Afsnit 3 (DA)', type: 'text', rows: 4, group: 'da' }),
    defineField({ name: 'p4', title: 'Afsnit 4 (DA)', type: 'text', rows: 4, group: 'da' }),
    defineField({
      name: 'facts',
      title: 'Faktatabel (DA)',
      type: 'array',
      group: 'da',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Værdi', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    // English
    defineField({
      name: 'worksBest',
      title: 'Jeg arbejder bedst med · punkter (DA)',
      type: 'array',
      group: 'da',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'headingEn', title: 'Heading (EN)', type: 'string', group: 'en' }),
    defineField({ name: 'p1En', title: 'Paragraph 1 (EN)', type: 'text', rows: 3, group: 'en' }),
    defineField({ name: 'p2En', title: 'Paragraph 2 (EN)', type: 'text', rows: 5, group: 'en' }),
    defineField({ name: 'p3En', title: 'Paragraph 3 (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({ name: 'p4En', title: 'Paragraph 4 (EN)', type: 'text', rows: 4, group: 'en' }),
    defineField({
      name: 'worksBestEn',
      title: 'I work best with · items (EN)',
      type: 'array',
      group: 'en',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'factsEn',
      title: 'Fact table (EN)',
      type: 'array',
      group: 'en',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    // Om ordningen sections
    defineField({
      name: 'sections',
      title: 'Sektioner (DA)',
      type: 'array',
      group: 'ordningen',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Titel', type: 'string' },
          { name: 'body', title: 'Tekst', type: 'text', rows: 5 },
          { name: 'list', title: 'Punkter', type: 'array', of: [{ type: 'string' }] },
          { name: 'note', title: 'Note', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({
      name: 'sectionsEn',
      title: 'Sections (EN)',
      type: 'array',
      group: 'ordningen',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'body', title: 'Text', type: 'text', rows: 5 },
          { name: 'list', title: 'Bullet points', type: 'array', of: [{ type: 'string' }] },
          { name: 'note', title: 'Note', type: 'text', rows: 3 },
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: () => ({ title: 'Fleksjob' }) },
})
