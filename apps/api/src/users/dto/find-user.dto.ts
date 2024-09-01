import { z } from 'zod';

export const FindUserSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .required();

export type FindUserDto = z.infer<typeof FindUserSchema>;
