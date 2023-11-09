import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { CustomResFilter } from './custom-res.filter';

export async function httpBootstrap(module: unknown, globalPrefix: string) {
  const app = await NestFactory.create<NestFastifyApplication>(
    module,
    new FastifyAdapter()
  );

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new CustomResFilter());
  await app.init();

  return app;
}
