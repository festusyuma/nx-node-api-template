import { Injectable } from '@nestjs/common';
import { Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../repo/agentRepo';
import { CreateAgentData, UpdateAgentData } from '../utils/schema/agentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { Agent } from '../utils/types';

@Injectable()
export class AgencyService {
  constructor(private agentRepo: AgentRepo) {}

  async createAgent(data: CreateAgentData): Promise<Selectable<Agent>> {
    return await this.agentRepo.create(data);
  }

  async findAllAgent(
    id: string,
    pagination: PaginationData
  ): Promise<Selectable<Agent>[]> {
    return await this.agentRepo.findAllByAgencyId(id, pagination);
  }

  async findAgentById(id: string) {
    return this.agentRepo.findById(id);
  }

  async updateAgent(
    id: string,
    data: UpdateAgentData
  ): Promise<Updateable<Agent>> {
    return this.agentRepo.updateById(id, data);
  }
}
