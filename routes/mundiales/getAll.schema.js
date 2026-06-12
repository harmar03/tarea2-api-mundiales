import { z } from 'zod';

// query string de /mundiales: include=full es opcional
export const getAllSchema = z.object({
  include: z.literal('full').optional()
});
