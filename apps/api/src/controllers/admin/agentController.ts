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

    const user = await this.#agentService.createAgentUser(data);

    data.userId = user.id;

    const result = this.#agentService.create(data);

    return Res.success(result);
  }
}
