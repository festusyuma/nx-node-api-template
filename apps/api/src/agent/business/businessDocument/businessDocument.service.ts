import { Injectable } from '@nestjs/common';

import { BusinessDocumentRepo } from '../../../repo/businessDocumentRepo';
import { CreateBusinessDocumentData } from '../../../utils/schema/businessDocumentSchema';
import { PaginationData } from '../../../utils/schema/paginationSchema';

@Injectable()
export class BusinessDocumentService {
  constructor(private businessDocumentRepo: BusinessDocumentRepo) {}

  async create(data: CreateBusinessDocumentData) {
    return await this.businessDocumentRepo.create(data);
  }

  async findBusinessDocumentById(id: string, pagination: PaginationData) {
    return await this.businessDocumentRepo.findByBusinessId(id, pagination);
  }
}
