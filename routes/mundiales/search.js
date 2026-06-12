import * as mundiales from '../../data/mundiales.js';
import { searchSchema } from './search.schema.js';

export const search = (req, res) => {
  const result = searchSchema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json({ error: 'Busqueda invalida', detalles: result.error.issues });
  }

  const resultados = mundiales.search(result.data.text);
  if (resultados.length === 0) {
    return res.status(404).json({ error: `No hay resultados para '${result.data.text}'` });
  }
  res.json({ texto: result.data.text, total: resultados.length, resultados });
};
