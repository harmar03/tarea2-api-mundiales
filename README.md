# Tarea 2 — API REST de la Copa Mundial de la FIFA

API REST construida con **Node.js**, **Express**, **SQLite** (better-sqlite3) y **Zod**.
Expone información sobre las ediciones de la Copa Mundial: año, sede, campeón,
subcampeón, goleador, cantidad de equipos, imagen y descripción.

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Poblar la base de datos (crea db/mundiales.db con 8 ediciones)
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
├── src/
│   ├── server.js     # Punto de entrada, levanta el servidor
│   ├── app.js        # Aplicación Express y rutas
│   ├── db.js         # Conexión a SQLite
│   └── schemas.js    # Esquemas de validación con Zod
├── scripts/
│   └── seed.js       # Crea y puebla la base de datos
├── public/
│   └── imagenes/     # Imágenes de las ediciones (SVG)
├── db/               # Base de datos SQLite (generada con npm run seed)
├── README.md
└── REFERENCIAS.md
```
