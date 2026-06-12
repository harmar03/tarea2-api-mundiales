import * as mundiales from '../../data/mundiales.js';
import { getBySlugSchema } from './getBySlug.schema.js';

export const getBySlug = (req, res) => {
  const result = getBySlugSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ error: 'Slug invalido', detalles: result.error.issues });
  }

  const mundial = mundiales.getBySlug(result.data.slug);
  if (!mundial) {
    return res.status(404).json({ error: `No existe el mundial con slug '${result.data.slug}'` });
  }
  res.json(mundial);
};
