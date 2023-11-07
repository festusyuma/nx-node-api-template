import { AgentRepo } from '../../repo/agentRepo';
import {
  CreateAgentData,
  UpdateAgentData,
} from '../../utils/schema/agentSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

export class AgentService {
  constructor(private agentRepo: AgentRepo) {}

  async create(data: CreateAgentData) {
    return this.agentRepo.create(data);
  }

  async findAll(pagination: PaginationData) {
    return this.agentRepo.findAll(pagination);
  }

  async findById(id: string) {
    return this.agentRepo.findById(id);
  }
  async update(id: string, data: UpdateAgentData) {
    return this.agentRepo.updateById(id, data);
  }
}
