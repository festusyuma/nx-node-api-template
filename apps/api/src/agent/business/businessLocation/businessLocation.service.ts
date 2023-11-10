import { Injectable } from '@nestjs/common';

import { BusinessLocationRepo } from '../../../repo/businessLocationRepo';
import { CreateBusinessLocationData } from '../../../utils/schema/businessLocationSchema';
import { PaginationData } from '../../../utils/schema/paginationSchema';

@Injectable()
export class BusinessLocationService {
  constructor(private businessLocationRepo: BusinessLocationRepo) {}

  async create(data: CreateBusinessLocationData) {
    return await this.businessLocationRepo.create(data);
  }

  async findBusinessLocationById(id: string, pagination: PaginationData) {
    return await this.businessLocationRepo.findAllByBusinessId(id, pagination);
  }
}
