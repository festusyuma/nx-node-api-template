import { AgentRepo } from '../../repo/agentRepo';
import {
  CreateAgentData,
  UpdateAgentData,
} from '../../utils/schema/agentSchema';

export class AgentService {
  constructor(private agentRepo: AgentRepo) {}

  async create(data: CreateAgentData) {
    return this.agentRepo.create(data);
  }

  async findAll() {
    return this.agentRepo.findAll();
  }

  async findById(id: string) {
    return this.agentRepo.findById(id);
  }
  async update(id: string, data: UpdateAgentData) {
    return this.agentRepo.updateById(id, data);
  }
}
