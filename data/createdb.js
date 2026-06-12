import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new DatabaseSync(path.join(__dirname, 'mundiales.db'));

const createSql = readFileSync(path.join(__dirname, 'CREATE.SQL'), 'utf8');
db.exec(createSql);

const mundiales = JSON.parse(readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'));

const insertar = db.prepare(`
  INSERT INTO mundiales
    (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const m of mundiales) {
  insertar.run(
    m.nombre, m.anio, m.sede, m.campeon, m.subcampeon,
    m.goleador, m.equipos, m.imagen, m.slug, m.resumen, m.descripcion
  );
}

console.log(`Base de datos poblada con ${mundiales.length} mundiales.`);
