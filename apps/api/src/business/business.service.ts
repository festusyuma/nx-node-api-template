import { Injectable } from '@nestjs/common';

import { BusinessDocumentRepo } from '../repo/businessDocumentRepo';
import { BusinessLocationRepo } from '../repo/businessLocationRepo';
import { BusinessRepo } from '../repo/businessRepo';
import { SecretsService } from '../secrets/secrets.service';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class BusinessService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessLocationRepo: BusinessLocationRepo,
    private businessDocumentRepo: BusinessDocumentRepo,
    private secrets: SecretsService
  ) {}

  async findBusiness(businessId: string) {
    return await this.businessRepo.findById(businessId);
  }

  async findBusinessQrCode(id: string) {
    const business = await this.businessRepo.findById(id);

    return `${
      this.secrets.get('BASEURL') ??
      `http://localhost:${this.secrets.get('PORT') ?? '8000'}`
    }/agent/business/qr-code/${business.qrCode}`;
  }

  async findBusinessLocation(businessId: string, pagination: PaginationData) {
    return await this.businessLocationRepo.findAllByBusinessId(
      businessId,
      pagination
    );
  }

  async findBusinessDocuments(businessId: string, pagination: PaginationData) {
    return await this.businessDocumentRepo.findByBusinessId(
      businessId,
      pagination
    );
  }
}
