# Tarea 2 — API REST de la Copa Mundial de la FIFA

API REST construida con **Node.js**, **Express**, **SQLite** (módulo nativo `node:sqlite`) y **Zod**.
Expone información sobre las ediciones de la Copa Mundial: año, sede, campeón,
subcampeón, goleador, cantidad de equipos, imagen y descripción.

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Poblar la base de datos (crea data/mundiales.db con 8 ediciones)
npm run seed

# 3. Iniciar el servidor (puerto 4321)
npm start
```

Para desarrollo con recarga automática:

```bash
npm run dev
```

El API queda disponible en `http://localhost:4321`.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `GET /` | Información del API |
| `GET /mundiales` | Lista resumida de ediciones |
| `GET /mundiales?include=full` | Lista con todos los campos |
| `GET /mundial/:slug` | Detalle de una edición (ej: `qatar-2022`) |
| `GET /campeon/:pais` | Slugs de las ediciones ganadas por ese país |
| `GET /random` | Una edición al azar |
| `GET /search/:text` | Búsqueda por texto (mínimo 3 caracteres) |
| `GET /imagenes/:archivo` | Imagen de la edición (ej: `qatar-2022.svg`) |

## Códigos de estado

| Código | Significado |
|--------|-------------|
| 200 | La petición fue exitosa y se devuelven datos |
| 400 | La validación de entrada (Zod) falló |
| 404 | No existe el recurso solicitado o la ruta no está definida |

## Estructura de una edición

```json
{
  "nombre": "Copa Mundial Qatar 2022",
  "anio": 2022,
  "sede": "Qatar",
  "campeon": "Argentina",
  "subcampeon": "Francia",
  "goleador": "Kylian Mbappe",
  "equipos": 32,
  "imagen": "qatar-2022.svg",
  "slug": "qatar-2022",
  "resumen": "Argentina campeon tras una final epica ante Francia.",
  "descripcion": "Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo."
}
```

## Pruebas con xh / httpie

```bash
xh GET :4321/mundiales
xh GET :4321/mundiales include==full
xh GET :4321/mundial/qatar-2022
xh GET :4321/mundial/inexistente    # -> 404 JSON
xh GET :4321/campeon/Argentina
xh GET :4321/random
xh GET :4321/search/final
xh GET :4321/search/ab              # -> 400 JSON (minimo 3)
```

Las capturas de estas pruebas están en la carpeta `docs/capturas/`.

## Estructura del proyecto

```
tarea2/
├── index.js                      # Aplicación Express, rutas y servidor
├── data.json                     # Datos de las 8 ediciones
├── data/
│   ├── CREATE.SQL                # Definición de la tabla
│   ├── createdb.js               # Crea y puebla la base de datos
│   ├── mundiales.js              # Repositorio (consultas con node:sqlite)
│   └── mundiales.db              # Base de datos (generada con npm run seed)
├── routes/
│   └── mundiales/                # Un controlador por ruta + su schema de Zod
│       ├── getAll.js / getAll.schema.js
│       ├── getBySlug.js / getBySlug.schema.js
│       ├── getByChampion.js / getByChampion.schema.js
│       ├── random.js
│       └── search.js / search.schema.js
├── public/
│   └── imagenes/                 # Imágenes de las ediciones (SVG)
├── docs/
│   └── capturas/                 # Capturas de las pruebas con xh
├── README.md
└── REFERENCIAS.md
```
