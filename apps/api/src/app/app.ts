import * as path from 'node:path';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import AutoLoad from '@fastify/autoload';


export async function app(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
