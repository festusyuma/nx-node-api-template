import { expireItem, getItem } from '@backend-template/cache';
import { NextFunction, Request, Response } from 'express';
import { DateTime } from 'luxon';

import { Res } from './res';

export async function preRequestHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let key = `${process.env.STACK_NAME}:${req.originalUrl ?? req.url}`;
  if (req.user) key += `:${req.token}`;

  const resetCache = req.headers['cache-control-reset'] === 'true';
  if (resetCache) {
    await expireItem(key, -1);
    return next();
  }

  const cachedData = await getItem(key);
  if (!cachedData) return next();

  try {
    const result = JSON.parse(cachedData) as Res<unknown>;
    const resData = result.getData();

    console.info(
      `response (${DateTime.now().toISO()}) ${result.status}: ${JSON.stringify(
        resData
      )}`
    );

    return res.status(result.status).send(resData);
  } catch (e) {
    console.error('error parsing cache ', e);
    next();
  }
}
