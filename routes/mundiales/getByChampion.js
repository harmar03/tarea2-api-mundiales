import * as mundiales from '../../data/mundiales.js';
import { getByChampionSchema } from './getByChampion.schema.js';

export const getByChampion = (req, res) => {
  const result = getByChampionSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ error: 'Pais invalido', detalles: result.error.issues });
  }

  const filas = mundiales.getByChampion(result.data.pais);
  if (filas.length === 0) {
    return res.status(404).json({ error: `No hay ediciones ganadas por '${result.data.pais}'` });
  }
  res.json({
    pais: result.data.pais,
    total: filas.length,
    slugs: filas.map((fila) => fila.slug)
  });
};
