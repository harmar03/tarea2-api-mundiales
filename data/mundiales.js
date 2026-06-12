import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new DatabaseSync(path.join(__dirname, 'mundiales.db'));

export const getAll = () => {
  const query = db.prepare('SELECT nombre, anio, campeon, slug FROM mundiales ORDER BY anio DESC');
  return query.all();
};

export const getAllFull = () => {
  const query = db.prepare('SELECT * FROM mundiales ORDER BY anio DESC');
  return query.all();
};

export const getBySlug = (slug) => {
  const query = db.prepare('SELECT * FROM mundiales WHERE slug = ?');
  return query.get(slug);
};

export const getByChampion = (pais) => {
  const query = db.prepare(
    'SELECT slug FROM mundiales WHERE campeon = ? COLLATE NOCASE ORDER BY anio DESC'
  );
  return query.all(pais);
};

export const getRandom = () => {
  const query = db.prepare('SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1');
  return query.get();
};

export const search = (text) => {
  const query = db.prepare(`
    SELECT * FROM mundiales
    WHERE nombre LIKE ? OR sede LIKE ? OR campeon LIKE ? OR subcampeon LIKE ?
       OR goleador LIKE ? OR resumen LIKE ? OR descripcion LIKE ?
    ORDER BY anio DESC
  `);
  const patron = `%${text}%`;
  return query.all(patron, patron, patron, patron, patron, patron, patron);
};
