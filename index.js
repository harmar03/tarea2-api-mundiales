import express from 'express';
import { getAll } from './routes/mundiales/getAll.js';
import { getBySlug } from './routes/mundiales/getBySlug.js';
import { getByChampion } from './routes/mundiales/getByChampion.js';
import { random } from './routes/mundiales/random.js';
import { search } from './routes/mundiales/search.js';

const app = express();
const PORT = process.env.PORT ?? 4321;

// Archivos estaticos: GET /imagenes/<archivo>
app.use(express.static('public'));

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

app.get('/mundiales', getAll);
app.get('/mundial/:slug', getBySlug);
app.get('/campeon/:pais', getByChampion);
app.get('/random', random);
app.get('/search/:text', search);

// Cualquier otra ruta -> 404 JSON
app.use((req, res) => {
  res.status(404).json({ error: `La ruta '${req.path}' no existe` });
});

app.listen(PORT, () => {
  console.log(`API de mundiales escuchando en http://localhost:${PORT}`);
});
