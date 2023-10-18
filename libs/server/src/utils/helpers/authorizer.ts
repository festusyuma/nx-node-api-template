import { validateToken } from '@backend-template/token';
import { Request } from 'express';

import { HTTPMethod } from '../types';
import { SecurityBuilder } from './seccurityBuilder';

export const authorizer = async <T extends { roles: string[] }>(
  req: Request,
  security: SecurityBuilder,
  baseRoute?: string
) => {
  let allow = true;

  const token = (req.headers.authorization || '').split(' ')[1];
  const method = req.method as HTTPMethod;
  const path = req.path
    .replace(baseRoute ? `/${baseRoute}` : '', '')
    .replace(/^\/|\/$/g, '');

  const { authRequired, roles } = security.getRule(path, method);
  const user = await validateToken<T>(token);

  if (authRequired && !user) allow = false;
  if (user && roles && roles !== '*') {
    let found = false;

    for (const i in user.roles) {
      if (roles.includes(user.roles[i] ?? '')) {
        found = true;
        break;
      }
    }

    if (!found) allow = false;
  }

  return { isAuthorized: allow, data: { user, token } };
};
