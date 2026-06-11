import { db } from '../src/db.js';

db.exec(`
  DROP TABLE IF EXISTS mundiales;
  CREATE TABLE mundiales (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT NOT NULL,
    anio        INTEGER NOT NULL,
    sede        TEXT NOT NULL,
    campeon     TEXT NOT NULL,
    subcampeon  TEXT NOT NULL,
    goleador    TEXT NOT NULL,
    equipos     INTEGER NOT NULL,
    imagen      TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    resumen     TEXT NOT NULL,
    descripcion TEXT NOT NULL
  );
`);

const mundiales = [
  {
    nombre: 'Copa Mundial Qatar 2022',
    anio: 2022,
    sede: 'Qatar',
    campeon: 'Argentina',
    subcampeon: 'Francia',
    goleador: 'Kylian Mbappe',
    equipos: 32,
    imagen: 'qatar-2022.svg',
    slug: 'qatar-2022',
    resumen: 'Argentina campeon tras una final epica ante Francia.',
    descripcion: 'Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo.'
  },
  {
    nombre: 'Copa Mundial Rusia 2018',
    anio: 2018,
    sede: 'Rusia',
    campeon: 'Francia',
    subcampeon: 'Croacia',
    goleador: 'Harry Kane',
    equipos: 32,
    imagen: 'rusia-2018.svg',
    slug: 'rusia-2018',
    resumen: 'Francia vencio 4-2 a Croacia en la final de Moscu.',
    descripcion: 'Una generacion joven liderada por Mbappe y Griezmann dio a Francia su segundo titulo.'
  },
  {
    nombre: 'Copa Mundial Brasil 2014',
    anio: 2014,
    sede: 'Brasil',
    campeon: 'Alemania',
    subcampeon: 'Argentina',
    goleador: 'James Rodriguez',
    equipos: 32,
    imagen: 'brasil-2014.svg',
    slug: 'brasil-2014',
    resumen: 'Alemania gano la final ante Argentina con gol de Gotze en la prorroga.',
    descripcion: 'Recordado por el historico 7-1 de Alemania sobre Brasil en semifinales.'
  },
  {
    nombre: 'Copa Mundial Sudafrica 2010',
    anio: 2010,
    sede: 'Sudafrica',
    campeon: 'Espana',
    subcampeon: 'Paises Bajos',
    goleador: 'Thomas Muller',
    equipos: 32,
    imagen: 'sudafrica-2010.svg',
    slug: 'sudafrica-2010',
    resumen: 'Iniesta dio a Espana su primer titulo con un gol en la final.',
    descripcion: 'Primer Mundial en Africa; Espana gano 1-0 a Paises Bajos en la prorroga.'
  },
  {
    nombre: 'Copa Mundial Alemania 2006',
    anio: 2006,
    sede: 'Alemania',
    campeon: 'Italia',
    subcampeon: 'Francia',
    goleador: 'Miroslav Klose',
    equipos: 32,
    imagen: 'alemania-2006.svg',
    slug: 'alemania-2006',
    resumen: 'Italia gano en penales una final recordada por la expulsion de Zidane.',
    descripcion: 'Italia consiguio su cuarto titulo tras empatar 1-1 con Francia y ganar en penales.'
  },
  {
    nombre: 'Copa Mundial Mexico 1986',
    anio: 1986,
    sede: 'Mexico',
    campeon: 'Argentina',
    subcampeon: 'Alemania Federal',
    goleador: 'Gary Lineker',
    equipos: 24,
    imagen: 'mexico-1986.svg',
    slug: 'mexico-1986',
    resumen: 'El Mundial de Maradona: la mano de Dios y el gol del siglo.',
    descripcion: 'Argentina gano 3-2 la final ante Alemania Federal con un Maradona inolvidable.'
  },
  {
    nombre: 'Copa Mundial Espana 1982',
    anio: 1982,
    sede: 'Espana',
    campeon: 'Italia',
    subcampeon: 'Alemania Federal',
    goleador: 'Paolo Rossi',
    equipos: 24,
    imagen: 'espana-1982.svg',
    slug: 'espana-1982',
    resumen: 'Italia y Paolo Rossi brillaron en la final ante Alemania Federal.',
    descripcion: 'Primer Mundial con 24 equipos; Italia gano 3-1 la final en el Santiago Bernabeu.'
  },
  {
    nombre: 'Copa Mundial Argentina 1978',
    anio: 1978,
    sede: 'Argentina',
    campeon: 'Argentina',
    subcampeon: 'Paises Bajos',
    goleador: 'Mario Kempes',
    equipos: 16,
    imagen: 'argentina-1978.svg',
    slug: 'argentina-1978',
    resumen: 'Argentina gano su primer titulo en la final ante Paises Bajos.',
    descripcion: 'Kempes fue la figura del torneo; Argentina gano 3-1 la final en la prorroga.'
  }
];

const insertar = db.prepare(`
  INSERT INTO mundiales
    (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
  VALUES
    (@nombre, @anio, @sede, @campeon, @subcampeon, @goleador, @equipos, @imagen, @slug, @resumen, @descripcion)
`);

const insertarTodos = db.transaction((filas) => {
  for (const fila of filas) insertar.run(fila);
});

insertarTodos(mundiales);
console.log(`Base de datos poblada con ${mundiales.length} mundiales.`);
