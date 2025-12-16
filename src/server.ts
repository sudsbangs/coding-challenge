import { buildApp } from './app';

const PORT = Number(process.env.PORT) || 3000;
const HOST = 'localhost';

async function start() {
  const app = buildApp();

  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`Server listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
