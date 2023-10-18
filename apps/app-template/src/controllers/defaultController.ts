import { Controller, Res } from '@backend-template/server';
import { Request } from 'express';

import { DefaultService } from '../services';
import { DefaultServiceImpl } from '../services/impl';

export class DefaultController extends Controller {
  readonly #defaultService: DefaultService;
  test = 'ge';

  constructor(defaultService: DefaultService = new DefaultServiceImpl()) {
    super();
    console.log('hello world');
    this.#defaultService = defaultService;
  }

  async default(req: Request) {
    const us = this.user(req).unwrapOrThrow();
    const pagination = this.pagination(req);

    console.log({ us, pagination });

    const user = await this.#defaultService.getUser();
    return Res.success(user);
  }
}
