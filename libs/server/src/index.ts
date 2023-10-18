import { UserData } from '@backend-template/types';

import { CacheExpiration, Res } from './utils';

declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: UserData;
      rawBody: Buffer;
      result?: Res<unknown>;
      cacheExpiration?: CacheExpiration;
    }
  }
}

export { appHandler } from './lib/appHandler';
export { Controller } from './lib/controller';
export { route } from './lib/route';
export { server } from './lib/server';
export * from './utils';
