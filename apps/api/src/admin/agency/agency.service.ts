import { Injectable } from '@nestjs/common';
import { generateRandomString } from 'libs/helpers/src/utils';

import { AgencyRepo } from '../../repo/agencyRepo';
import { UserRepo } from '../../repo/userRepo';
// import {} from '../../repo/'
import {
  CreateAgencyWithAdminData,
  UpdateAgencyData,
} from '../../utils/schema/agencySchema';
import { PaginationData } from '../../utils/schema/paginationSchema';

@Injectable()
export class AgencyService {
  constructor(
    private agencyRepo: AgencyRepo,
    private userRepo: UserRepo
  ) { }

  async findAll(pagination: PaginationData) {
    return {
      result: await this.agencyRepo.findAll(pagination),
      pagination: pagination,
    };
  }
  async findById(id: string) {
    return this.agencyRepo.findById(id);
  }


  async create(data: CreateAgencyWithAdminData) {
    const password = generateRandomString(10);
    console.log({ password });
    const agency = await this.agencyRepo.createAgencyAndAdmin({ ...data, password });
    // TODO send email to admin of newly created account.
    return agency
  }


  async update(id: string, data: UpdateAgencyData) {
    return this.agencyRepo.updateById(id, data);
  }
}
