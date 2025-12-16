import Fastify from 'fastify';
import cors from '@fastify/cors';

import { healthRoutes } from './routes/health.route';
import { mainRoutes } from './routes/main.route';

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Plugins
  app.register(cors, {
    origin: true,
  });

  // Routes
  app.register(healthRoutes, { prefix: '/health' });
  app.register(mainRoutes, { prefix: '/api' });

  return app;
}
