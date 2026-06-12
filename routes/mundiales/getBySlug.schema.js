import { z } from 'zod';

// slug: minusculas, numeros y guiones (ej: qatar-2022)
export const getBySlugSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'El slug debe contener solo minusculas, numeros y guiones')
});
