import { CustomRes } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { BusinessService as MainBusinessService } from '../../business/business.service';
import { BusinessDocumentRepo } from '../../repo/businessDocumentRepo';
import { BusinessRepo } from '../../repo/businessRepo';
import { UpdateBusinessData } from '../../utils/schema/businessSchema';
import { PaginationData } from '../../utils/schema/paginationSchema';
import { BusinessStatus } from '../../utils/types';

@Injectable()
export class BusinessService {
  constructor(
    private businessRepo: BusinessRepo,
    private businessDocumentRepo: BusinessDocumentRepo,
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

  async verifyBusinessStatus(businessId: string) {
    const documents =
      await this.businessDocumentRepo.findByBusinessIdWithoutPagination(
        businessId
      );

    if (documents.length == 0) throw CustomRes.failed('Upload Document');

    return await this.businessRepo.updateById(businessId, {
      status: BusinessStatus.VERIFIED,
    });
  }

  async rejectBusinessStatus(businessId: string, data: UpdateBusinessData) {
    return await this.businessRepo.updateById(businessId, {
      status: BusinessStatus.REJECTED,
      reasonRejected: data.reasonRejected,
    });
  }
}
