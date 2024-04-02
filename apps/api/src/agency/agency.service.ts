import { CustomRes } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../repo/agentRepo';
import { BusinessDocumentRepo } from '../repo/businessDocumentRepo';
import { BusinessRepo } from '../repo/businessRepo';
import { PaymentTypeRepo } from '../repo/paymentTypeRepo';
import { TaskRepo } from "../repo/taskRepo";
import { CreateAgentData, UpdateAgentData } from '../utils/schema/agentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { CreatePaymentTypeData } from '../utils/schema/paymentTypeSchema';
import { assignTaskData } from "../utils/schema/taskSchema";
import { UpdateBusinessData } from '../utils/schema/types';
import { Agent, BusinessStatus } from '../utils/types';

@Injectable()
export class AgencyService {
  constructor(
    private agentRepo: AgentRepo,
    private paymentTypeRepo: PaymentTypeRepo,
    private businessRepo: BusinessRepo,
    private businessDocumentRepo: BusinessDocumentRepo,
    private taskRepo: TaskRepo,
  ) { }

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

  async businessPendingApproval(agencyId: string, pagination: PaginationData) {
    return this.businessRepo.findAgencyPendingBusiness(agencyId, pagination);
  }

  async approveBusiness(businessId: string, agencyId: string) {
    const documents =
      await this.businessDocumentRepo.findByBusinessIdWithoutPagination(
        businessId
      );

    if (!documents.length) throw CustomRes.failed('Business document not uploaded');
    return await this.businessRepo.updateAgencyBusiness({
      id: businessId, agencyId, data: {
        status: BusinessStatus.VERIFIED,
      }
    });
  }

  async rejectBusinessStatus({ businessId, agencyId, data }: { businessId: string; agencyId: string; data: UpdateBusinessData }) {
    return await this.businessRepo.updateAgencyBusiness({
      id: businessId, agencyId, data: {
        status: BusinessStatus.REJECTED,
        reasonRejected: data.reasonRejected,
      }
    });
  }

  async assignTaskToAgent({ assignTaskPayload, agencyId }: { assignTaskPayload: assignTaskData, agencyId: string }) {
    return this.taskRepo.createTask({ ...assignTaskPayload, agencyId });
  }
}
