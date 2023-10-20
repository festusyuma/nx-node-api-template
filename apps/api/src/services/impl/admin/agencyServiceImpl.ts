import { Agency } from '@backend-template/types';

import { AgencyRepo } from '../../../repo/agencyRepo';
import { AgencyRepoImpl } from '../../../repo/impl/agencyRepoImpl';
import { AgencyService } from '../../admin/agencyService';

export class AgencyServiceImpl implements AgencyService {
  readonly #agencyRepo: AgencyRepo;

  constructor(agencyRepo: AgencyRepo = new AgencyRepoImpl()) {
    this.#agencyRepo = agencyRepo;
  }

  create(data: Agency): Promise<Agency> {
    return this.#agencyRepo.create(data).unwrapOrThrow();
  }

  findAll(): Promise<Agency[]> {
    return this.#agencyRepo.findAll().unwrapOrThrow();
  }

  findById(id: string): Promise<Agency> {
    return this.#agencyRepo.findById(id).unwrapOrThrow();
  }

  update(id: string, data: Agency): Promise<Agency> {
    return this.#agencyRepo.updateById(id, data).unwrapOrThrow();
  }
}
