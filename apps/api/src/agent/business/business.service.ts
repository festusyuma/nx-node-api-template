import { Injectable } from '@nestjs/common';

import { BusinessRepo } from '../../repo/businessRepo';
import { SecretsService } from '../../secrets/secrets.service';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class BusinessService {
  constructor(
    private businessRepo: BusinessRepo,
    private secrets: SecretsService
  ) {}

  async findBusiness(pagination: PaginationData) {
    return await this.businessRepo.findAll(pagination);
  }

  async findBusinessById(id: string) {
    return await this.businessRepo.findById(id);
  }

  async qr_code_url(id: string) {
    const business = await this.businessRepo.findById(id);

    return `${
      this.secrets.get('BASEURL') ??
      `http://localhost:${this.secrets.get('PORT') ?? '8000'}`
    }/agent/business/qr-code/${business.qrCode}`;
  }

  async qr_code(id: string) {
    return await this.businessRepo.findByQrCode(id);
  }

  async updateBusinessById(id: string, data: UpdateBusinessData) {
    return await this.businessRepo.updateById(id, data);
  }
}
