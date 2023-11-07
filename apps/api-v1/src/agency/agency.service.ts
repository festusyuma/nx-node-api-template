import {
  Agent,
  CreateAgentData,
  UpdateAgentData,
} from '@backend-template/types';
import { Injectable } from '@nestjs/common';
import { Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../repo/agentRepo';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class AgencyService {
  constructor(private agentRepo: AgentRepo) {}

  async createAgent(data: CreateAgentData): Promise<Selectable<Agent>> {
    return await this.agentRepo.create(data).elseThrow();
  }

  async findAllAgent(
    id: string,
    pagination: PaginationData
  ): Promise<Selectable<Agent>[]> {
    return await this.agentRepo.findAllByAgencyId(id, pagination).elseThrow();
  }

  async findAgentById(id: string): Promise<Selectable<Agent>> {
    return this.agentRepo.findById(id).elseThrow();
  }

  async updateAgent(
    id: string,
    data: UpdateAgentData
  ): Promise<Updateable<Agent>> {
    return this.agentRepo.updateById(id, data).elseThrow();
  }
}
