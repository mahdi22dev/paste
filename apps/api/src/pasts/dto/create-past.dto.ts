import { z } from 'zod';

export const CreatePastSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    date: z.date(),
    syntax: z.string(),
    mode: 'public' | '' | '',
  })
  .required();

export type CreatePastDto = z.infer<typeof CreatePastSchema>;
