import { Injectable } from '@nestjs/common';

import { SignageRepo } from '../../../repo/signageRepo';
import { PaginationData } from '../../../utils/schema/paginationSchema';
import {
  CreateBulkSignageData,
  CreateSignageData,
  UpdateSignageData,
} from '../../../utils/schema/signageSchema';

@Injectable()
export class SignageService {
  constructor(private signageRepo: SignageRepo) {}

  async create(data: CreateSignageData) {
    return await this.signageRepo.create(data);
  }

  async createBulk(data: CreateBulkSignageData) {
    return await this.signageRepo.createBulk(data);
  }

  async findById(id: string) {
    return await this.signageRepo.findById(id);
  }

  async findByBusinessId(id: string, pagination: PaginationData) {
    return await this.signageRepo.findByBusinessId(id, pagination);
  }

  async findByBusinessSignage(id: string, business_id: string) {
    return await this.signageRepo.findBusinessSignageById(id, business_id);
  }

  async updateById(id: string, business_id: string, data: UpdateSignageData) {
    return await this.signageRepo.updateBusinessSignageId(
      id,
      business_id,
      data
    );
  }
}
