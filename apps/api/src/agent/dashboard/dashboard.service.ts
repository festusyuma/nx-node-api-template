import { CreateBusinessData } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { BusinessLocationRepo } from '../../repo/businessLocationRepo';
import { BusinessRepo } from '../../repo/businessRepo';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class DashboardService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessLocationRepo: BusinessLocationRepo
  ) { }

  async createBusiness(data: CreateBusinessData & { agencyId: string }) {
    return this.businessRepo.create(data);
  }

  async findRegisteredBusinessCount(id: string) {
    return await this.businessLocationRepo.findAgentRegisteredBusinessCount(id);
  }

  async business_todo(id: string, pagination: PaginationData) {
    return await this.businessLocationRepo.findAllUnVerifiedByAgentId(
      id,
      pagination
    );
  }

  async assignedTasked() {
    return [];
  }
}
