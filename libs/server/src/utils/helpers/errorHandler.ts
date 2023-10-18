import { ErrorRequestHandler } from 'express';

import { resourceNotFound, unknownServerError } from '../constants';
import { Res } from './res';

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  if (!err) res.status(404).send({ success: false, message: resourceNotFound });

  if (err instanceof Res) return res.status(err.status).send(err.getData());

  return res.status(500).send({ success: false, message: unknownServerError });
};
