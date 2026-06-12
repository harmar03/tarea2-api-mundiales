import * as mundiales from '../../data/mundiales.js';

export const random = (req, res) => {
  const mundial = mundiales.getRandom();
  if (!mundial) {
    return res.status(404).json({ error: 'No hay mundiales en la base de datos' });
  }
  res.json(mundial);
};
