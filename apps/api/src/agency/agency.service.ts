import { Injectable } from '@nestjs/common';
import { Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../repo/agentRepo';
import { PaymentTypeRepo } from '../repo/paymentTypeRepo';
import { CreateAgentData, UpdateAgentData } from '../utils/schema/agentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { CreatePaymentTypeData } from '../utils/schema/paymentTypeSchema';
import { Agent } from '../utils/types';

@Injectable()
export class AgencyService {
  constructor(
    private agentRepo: AgentRepo,
    private paymentTypeRepo: PaymentTypeRepo
  ) {}

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

  async createPaymentType(data: CreatePaymentTypeData) {
    return this.paymentTypeRepo.create(data);
  }

  async paymentType(id: string, pagination: PaginationData) {
    return this.paymentTypeRepo.findByAgencyId(id, pagination);
  }
}
