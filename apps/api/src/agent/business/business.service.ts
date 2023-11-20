import { Injectable } from '@nestjs/common';

import { BusinessService as MainBusinessService } from '../../business/business.service';
import { BusinessRepo } from '../../repo/businessRepo';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class BusinessService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessService: MainBusinessService
  ) {}

  async findBusiness(pagination: PaginationData) {
    return await this.businessRepo.findAll(pagination);
  }

  async findBusinessById(id: string) {
    return await this.businessRepo.findById(id);
  }

  async qr_code_url(id: string) {
    return await this.businessService.findBusinessQrCode(id);
  }

  async qr_code(id: string) {
    return await this.businessRepo.findByQrCode(id);
  }

  async updateBusinessById(id: string, data: UpdateBusinessData) {
    return await this.businessRepo.updateById(id, data);
  }
}
