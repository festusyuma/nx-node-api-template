import { Controller, Res } from '@backend-template/server';
import { CreateAgentSchema } from '@backend-template/types';
import { Request } from 'express';

import { AgentService } from '../../services/admin/agentService';
import { AgentServiceImpl } from '../../services/impl/admin/agentServiceImpl';

export class AgentController extends Controller {
  readonly #agentService: AgentService;

  constructor(agentService: AgentService = new AgentServiceImpl()) {
    super();
    this.#agentService = agentService;
  }

  async create(req: Request) {
    const data = this.validate({ schema: CreateAgentSchema }, req.body);

    const result = await this.#agentService.create(data);

    return Res.success(result);
  }

  async findAll(req: Request) {
    const pagination = this.pagination(req);

    const result = await this.#agentService.findAll(pagination);
    return Res.success({ result: result, pagination: pagination });
  }
}
