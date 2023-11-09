import { CreateBusinessData } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { BusinessLocationRepo } from '../../repo/businessLocationRepo';
import { BusinessRepo } from '../../repo/businessRepo';

@Injectable()
export class DashboardService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessLocationRepo: BusinessLocationRepo
  ) {}

  async createBusiness(data: CreateBusinessData) {
    return this.businessRepo.create(data);
  }

  async findRegisteredBusinessCount(id: string) {
    return await this.businessLocationRepo.findAgentRegisteredBusinessCount(id);
  }

  async assignedTasked() {
    return [];
  }
}
