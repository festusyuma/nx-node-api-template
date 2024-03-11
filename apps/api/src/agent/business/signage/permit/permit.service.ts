import { Injectable } from '@nestjs/common';

import { SignagePermitRepo } from '../../../../repo/signagePermitRepo';
import {
  CreateSignagePermitData,
  UpdateSignagePermitData,
} from '../../../../utils/schema/signagePermitSchema';

@Injectable()
export class PermitService {
  constructor(private signagePermitRepo: SignagePermitRepo) {}

  async create(data: CreateSignagePermitData) {
    return await this.signagePermitRepo.create(data);
  }

  async findById(id: string) {
    return await this.signagePermitRepo.findById(id);
  }

  async findBySignageIdAndId(id: string, signage_id: string) {
    return await this.signagePermitRepo.findBySignageIdAndId(id, signage_id);
  }

  async findByPaymentId(id: string) {
    return await this.signagePermitRepo.findByPaymentId(id);
  }

  async findLatestPermit(id: string) {
    return await this.signagePermitRepo.findLatestPermit(id);
  }

  async updateById(id: string, data: UpdateSignagePermitData) {
    return await this.signagePermitRepo.updateById(id, data);
  }

  async updateSignagePermitById(
    id: string,
    signage_id: string,
    data: UpdateSignagePermitData
  ) {
    return await this.signagePermitRepo.updateBySignageIdAndPermitId(
      id,
      signage_id,
      data
    );
  }

  async updateByPaymentId(id: string, data: UpdateSignagePermitData) {
    return await this.signagePermitRepo.updateByPaymentId(id, data);
  }
}
