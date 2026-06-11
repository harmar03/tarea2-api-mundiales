import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';
import { slugSchema, paisSchema, searchSchema, mundialesQuerySchema } from './schemas.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = express();

// Imagenes estaticas: GET /imagenes/<archivo>
app.use('/imagenes', express.static(path.join(__dirname, '..', 'public', 'imagenes')));

// GET / -> informacion del API
app.get('/', (req, res) => {
  res.json({
    nombre: 'API Copa Mundial de la FIFA',
    descripcion: 'API REST con informacion de las ediciones de la Copa Mundial',
    version: '1.0.0',
    autor: 'Martin',
    rutas: {
      '/': 'Informacion del API',
      '/mundiales': 'Lista de ediciones (include=full para todos los campos)',
      '/mundial/:slug': 'Detalle de una edicion por slug',
      '/campeon/:pais': 'Slugs de las ediciones ganadas por ese pais',
      '/random': 'Una edicion al azar',
      '/search/:text': 'Busqueda por texto (minimo 3 caracteres)',
      '/imagenes/:archivo': 'Imagen de una edicion'
    }
  });
});

// GET /mundiales -> lista resumida; con ?include=full devuelve todos los campos
app.get('/mundiales', (req, res) => {
  const query = mundialesQuerySchema.safeParse(req.query);
  if (!query.success) {
    return res.status(400).json({ error: 'Query invalido', detalles: query.error.issues });
  }

  if (query.data.include === 'full') {
    const mundiales = db.prepare('SELECT * FROM mundiales ORDER BY anio DESC').all();
    return res.json(mundiales);
  }

  const mundiales = db
    .prepare('SELECT nombre, anio, campeon, slug FROM mundiales ORDER BY anio DESC')
    .all();
  res.json(mundiales);
});

// GET /mundial/:slug -> detalle de una edicion
app.get('/mundial/:slug', (req, res) => {
  const slug = slugSchema.safeParse(req.params.slug);
  if (!slug.success) {
    return res.status(400).json({ error: 'Slug invalido', detalles: slug.error.issues });
  }

  const mundial = db.prepare('SELECT * FROM mundiales WHERE slug = ?').get(slug.data);
  if (!mundial) {
    return res.status(404).json({ error: `No existe el mundial con slug '${slug.data}'` });
  }
  res.json(mundial);
});

// GET /campeon/:pais -> slugs de las ediciones ganadas por ese pais
app.get('/campeon/:pais', (req, res) => {
  const pais = paisSchema.safeParse(req.params.pais);
  if (!pais.success) {
    return res.status(400).json({ error: 'Pais invalido', detalles: pais.error.issues });
  }

  const filas = db
    .prepare('SELECT slug FROM mundiales WHERE campeon = ? COLLATE NOCASE ORDER BY anio DESC')
    .all(pais.data);
  if (filas.length === 0) {
    return res.status(404).json({ error: `No hay ediciones ganadas por '${pais.data}'` });
  }
  res.json({
    pais: pais.data,
    total: filas.length,
    slugs: filas.map((fila) => fila.slug)
  });
});

// GET /random -> una edicion al azar
app.get('/random', (req, res) => {
  const mundial = db.prepare('SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1').get();
  if (!mundial) {
    return res.status(404).json({ error: 'No hay mundiales en la base de datos' });
  }
  res.json(mundial);
});

// GET /search/:text -> busqueda por texto en varios campos
app.get('/search/:text', (req, res) => {
  const texto = searchSchema.safeParse(req.params.text);
  if (!texto.success) {
    return res.status(400).json({ error: 'Busqueda invalida', detalles: texto.error.issues });
  }

  const patron = `%${texto.data}%`;
  const resultados = db
    .prepare(
      `SELECT * FROM mundiales
       WHERE nombre LIKE ? OR sede LIKE ? OR campeon LIKE ? OR subcampeon LIKE ?
          OR goleador LIKE ? OR resumen LIKE ? OR descripcion LIKE ?
       ORDER BY anio DESC`
    )
    .all(patron, patron, patron, patron, patron, patron, patron);
  if (resultados.length === 0) {
    return res.status(404).json({ error: `No hay resultados para '${texto.data}'` });
  }
  res.json({ texto: texto.data, total: resultados.length, resultados });
});

// Cualquier otra ruta -> 404 JSON
app.use((req, res) => {
  res.status(404).json({ error: `La ruta '${req.path}' no existe` });
});
