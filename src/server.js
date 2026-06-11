import { app } from './app.js';

const PORT = process.env.PORT ?? 4321;

app.listen(PORT, () => {
  console.log(`API de mundiales escuchando en http://localhost:${PORT}`);
});
