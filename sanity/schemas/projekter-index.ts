import { defineField, defineType } from 'sanity'
import { ProjectOrderInput } from '../components/project-order-input'

export const projekterIndexSchema = defineType({
  name: 'projekterIndex',
  title: 'Projekter · Rækkefølge & forside',
  type: 'document',
  fields: [
    defineField({
      name: 'featured',
      title: 'Forside-projekter (vælg 3)',
      description: 'De tre projekter der vises under "Udvalgte projekter" på forsiden — i denne rækkefølge.',
      type: 'array',
      validation: r => r.max(3).unique(),
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'order',
      title: 'Rækkefølge i projektgalleriet',
      description: 'Skriv et nummer på et projekt (eller træk) for at flytte det. Rækkefølgen styrer projektsiden.',
      type: 'array',
      components: { input: ProjectOrderInput },
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: 'Projekter · Rækkefølge & forside' }) },
})
