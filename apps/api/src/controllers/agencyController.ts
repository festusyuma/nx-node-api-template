import { Controller, Res } from '@backend-template/server';
import { CreateAgentSchema } from '@backend-template/types';
import { Request } from 'express';

import { AgencyService } from '../services/agencyService';
import { AgencyServiceImpl } from '../services/impl/agencyServiceImpl';

export class AgencyController extends Controller {
  readonly #agencyService: AgencyService;

  constructor(agencyService: AgencyService = new AgencyServiceImpl()) {
    super();
    this.#agencyService = agencyService;
  }

  createAgent(req: Request) {
    const data = this.validate({ schema: CreateAgentSchema }, req.body);

    const result = this.#agencyService.create(data);
    return Res.success(result);
  }
}
