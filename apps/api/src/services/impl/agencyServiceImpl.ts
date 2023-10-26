import { Pagination } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  UpdateAgentData,
} from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../../repo/agentRepo';
import { AgentRepoImpl } from '../../repo/impl/agentRepoImpl';
import { AgencyService } from '../agencyService';

export class AgencyServiceImpl implements AgencyService {
  readonly #agentRepo: AgentRepo;

  constructor(agentRepo: AgentRepo = new AgentRepoImpl()) {
    this.#agentRepo = agentRepo;
  }
  create(data: CreateAgentData): Promise<Selectable<Agent>> {
    return this.#agentRepo.create(data).unwrapOrThrow();
  }

  findAll(pagination: Pagination): Promise<Selectable<Agent>[]> {
    return this.#agentRepo.findAll(pagination).unwrapOrThrow();
  }

  findById(id: string): Promise<Selectable<Agent>> {
    return this.#agentRepo.findById(id).unwrapOrThrow();
  }

  update(id: string, data: UpdateAgentData): Promise<Updateable<Agent>> {
    return this.#agentRepo.updateById(id, data).unwrapOrThrow();
  }
}
