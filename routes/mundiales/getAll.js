import * as mundiales from '../../data/mundiales.js';
import { getAllSchema } from './getAll.schema.js';

export const getAll = (req, res) => {
  const result = getAllSchema.safeParse(req.query);
  if (!result.success) {
    return res.status(400).json({ error: 'Query invalido', detalles: result.error.issues });
  }

  if (result.data.include === 'full') {
    return res.json(mundiales.getAllFull());
  }
  res.json(mundiales.getAll());
};
