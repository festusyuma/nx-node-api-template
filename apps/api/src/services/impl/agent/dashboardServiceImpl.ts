import {
  Business,
  CreateBusinessData,
  UserData,
} from '@backend-template/types';
import { Selectable } from 'kysely';

import { BusinessLocationRepo } from '../../../repo/businessLocationRepo';
import { BusinessRepo } from '../../../repo/businessRepo';
import { BusinessLocationRepoImpl } from '../../../repo/impl/businessLocationRepoImpl';
import { BusinessRepoImpl } from '../../../repo/impl/businessRepoImpl';
import { DashboardService } from '../../agent/dashboardService';

export class DashboardServiceImpl implements DashboardService {
  readonly #businessRepo: BusinessRepo;
  readonly #businessLocationRepo: BusinessLocationRepo;

  constructor(
    businessRepo: BusinessRepo = new BusinessRepoImpl(),
    businessLocationRepo = new BusinessLocationRepoImpl()
  ) {
    this.#businessRepo = businessRepo;
    this.#businessLocationRepo = businessLocationRepo;
  }
  createBusiness(data: CreateBusinessData): Promise<Selectable<Business>> {
    return this.#businessRepo.create(data).unwrapOrThrow();
  }

  findRegisteredBusinessCount(user: UserData): Promise<object> {
    return this.#businessLocationRepo
      .findAgentRegisteredBusinessCount(user)
      .unwrapOrThrow();
  }
}
