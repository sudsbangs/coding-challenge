import Fastify from 'fastify';
import cors from '@fastify/cors';

import { healthRoutes } from './routes/health.route';
import { apiRoutes } from './routes/api.route';

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
  app.register(apiRoutes, { prefix: '/api' });

  return app;
}
