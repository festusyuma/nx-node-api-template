import { CreateBusinessData } from '@backend-template/types';

import { BusinessLocationRepo } from '../../repo/businessLocationRepo';
import { BusinessRepo } from '../../repo/businessRepo';

export class DashboardService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessLocationRepo: BusinessLocationRepo
  ) {}

  async createBusiness(data: CreateBusinessData) {
    return this.businessRepo.create(data);
  }

  async findRegisteredBusinessCount(id: string) {
    return this.businessLocationRepo.findAgentRegisteredBusinessCount(id);
  }
}
