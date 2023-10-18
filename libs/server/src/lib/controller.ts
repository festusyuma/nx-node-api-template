import { UserData } from '@backend-template/types';
import { Request } from 'express';

import { IOptionalSync, Optional, Res, ValidationRequest } from '../utils';

export class Controller {
  protected req: Request | null = null;

  network(req: Request) {
    this.req = req;
    return this;
  }

  user(req: Request): IOptionalSync<UserData> {
    return Optional.sync(req.user);
  }

  pagination(req: Request) {
    const { page, size } = req.query;

    return {
      page: Number(page ?? 0),
      size: Number(size ?? 10),
      totalItems: 0,
      totalPages: 0,
    };
  }

  validate<T>(validation: ValidationRequest<T>, data: unknown): T {
    const res = validation.schema.safeParse(data, validation.options);
    if (res.success) return res.data;
    else
      throw Res.badRequest(
        res.error.errors
          .map((error) => `${error.path}: ${error.message}`)
          .join('; ')
      );
  }
}
