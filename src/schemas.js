import { z } from 'zod';

// slug: minusculas, numeros y guiones (ej: qatar-2022)
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'El slug debe contener solo minusculas, numeros y guiones');

// pais: solo letras y espacios, minimo 3 caracteres
export const paisSchema = z
  .string()
  .min(3, 'El pais debe tener al menos 3 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, 'El pais debe contener solo letras y espacios');

// texto de busqueda: minimo 3 caracteres
export const searchSchema = z
  .string()
  .min(3, 'El texto de busqueda debe tener al menos 3 caracteres');

// query string de /mundiales: include=full es opcional
export const mundialesQuerySchema = z.object({
  include: z.literal('full').optional()
});
