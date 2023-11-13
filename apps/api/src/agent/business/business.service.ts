import { Injectable } from '@nestjs/common';

import { BusinessRepo } from '../../repo/businessRepo';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class BusinessService {
  constructor(private businessRepo: BusinessRepo) {}

  async findBusiness(pagination: PaginationData) {
    return await this.businessRepo.findAll(pagination);
  }

  async findBusinessById(id: string) {
    return await this.businessRepo.findById(id);
  }

  async updateBusinessById(id: string, data: UpdateBusinessData) {
    return await this.businessRepo.updateById(id, data);
  }
}
