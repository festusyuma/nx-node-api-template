import { Injectable } from '@nestjs/common';

import { AgencyRepo } from '../../repo/agencyRepo';
import {
  CreateAgencyData,
  UpdateAgencyData,
} from '../../utils/schema/agencySchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class AgencyService {
  constructor(private agencyRepo: AgencyRepo) {}

  async findAll(pagination: PaginationData) {
    return {
      result: await this.agencyRepo.findAll(pagination),
      pagination: pagination,
    };
  }
  async findById(id: string) {
    return this.agencyRepo.findById(id);
  }

  async create(data: CreateAgencyData) {
    return this.agencyRepo.create(data);
  }
  async update(id: string, data: UpdateAgencyData) {
    return this.agencyRepo.updateById(id, data);
  }
}
