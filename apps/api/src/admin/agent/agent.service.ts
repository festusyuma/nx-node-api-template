import { Injectable } from '@nestjs/common';

import { AgentRepo } from '../../repo/agentRepo';
import {
  CreateAgentData,
  UpdateAgentData,
} from '../../utils/schema/agentSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class AgentService {
  constructor(private agentRepo: AgentRepo) {}

  async create(data: CreateAgentData) {
    return await this.agentRepo.create(data);
  }

  async findAll(pagination: PaginationData) {
    return {
      result: await this.agentRepo.findAll(pagination),
      pagination: pagination,
    };
  }

  async findById(id: string) {
    return await this.agentRepo.findById(id);
  }
  async update(id: string, data: UpdateAgentData) {
    return this.agentRepo.updateById(id, data);
  }
}
