import { z } from 'zod';

// pais: solo letras y espacios, minimo 3 caracteres
export const getByChampionSchema = z.object({
  pais: z
    .string()
    .min(3, 'El pais debe tener al menos 3 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El pais debe contener solo letras y espacios')
});
