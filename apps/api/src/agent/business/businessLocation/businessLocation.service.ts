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

  async findBusinessLocationByBusinessId(
    id: string,
    pagination: PaginationData
  ) {
    return await this.businessLocationRepo.findAllByBusinessId(id, pagination);
  }

  async findById(id: string, locationId: string) {
    return await this.businessLocationRepo.findById(id, locationId);
  }

  async verifyBusinessLocationById(
    id: string,
    locationId: string,
    status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED'
  ) {
    return await this.businessLocationRepo.updateStatusById(
      id,
      locationId,
      status
    );
  }
}
