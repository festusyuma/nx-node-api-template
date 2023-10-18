import { expireItem, setItem } from '@backend-template/cache';
import { Request, Response } from 'express';
import { DateTime } from 'luxon';

import { Res } from './res';

export async function postRequestHandler(req: Request, res: Response) {
  let key = `${process.env.STACK_NAME}:${req.originalUrl ?? req.url}`;
  if (req.user) key += `:${req.token}`;

  let result = req.result;
  if (!result) result = Res.serverError();

  if (req.cacheExpiration && result.success) {
    await setItem(key, JSON.stringify(result));
    await expireItem(key, req.cacheExpiration);
  }

  const resData = result.getData();

  console.info(
    `response (${DateTime.now().toISO()}) ${result.status}: ${JSON.stringify(
      resData
    )}`
  );

  return res.status(result.status).send(resData);
}
