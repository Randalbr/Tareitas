const app = require('./app');

const PUERTO = 700;

app.listen(PUERTO, () => {
  console.log(`Servidor Iniciado en http://localhost:${PUERTO}/`);
});
