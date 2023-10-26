import { Controller, Res } from '@backend-template/server';
import { CreateAgencySchema } from '@backend-template/types';
import { Request } from 'express';

import { AgencyService } from '../../services/admin/agencyService';
import { AgencyServiceImpl } from '../../services/impl/admin/agencyServiceImpl';

export class AgencyController extends Controller {
  readonly #agencyService: AgencyService;

  constructor(agencyService: AgencyService = new AgencyServiceImpl()) {
    super();
    this.#agencyService = agencyService;
  }

  async create(req: Request) {
    const data = this.validate({ schema: CreateAgencySchema }, req.body);
    const result = await this.#agencyService.create(data);

    return Res.success(result);
  }

  async findAll(req: Request) {
    const pagination = this.pagination(req);
    const result = await this.#agencyService.findAll(pagination);
    return Res.success({ result: result, pagination: pagination });
  }
}
