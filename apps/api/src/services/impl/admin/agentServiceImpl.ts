import { Pagination } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  CreateUserData,
  UpdateAgentData,
  User,
} from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

import { UserRepo } from '../../../repo';
import { AgentRepo } from '../../../repo/agentRepo';
import { AgentRepoImpl } from '../../../repo/impl/agentRepoImpl';
import { UserRepoImpl } from '../../../repo/impl/userRepoImpl';
import { AgentService } from '../../admin/agentService';

export class AgentServiceImpl implements AgentService {
  readonly #agentRepo: AgentRepo;
  readonly #userRepo: UserRepo;

  constructor(
    agentRepo: AgentRepo = new AgentRepoImpl(),
    userRepo: UserRepo = new UserRepoImpl()
  ) {
    this.#agentRepo = agentRepo;
    this.#userRepo = userRepo;
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
