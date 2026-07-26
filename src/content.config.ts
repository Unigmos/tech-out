import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tech = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tech' }),
  schema: z.object({
    title: z.string(),
    publish: z.boolean(),
    tags: z.array(z.string()),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
  }),
});

export const collections = { tech };