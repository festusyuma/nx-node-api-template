import { Pagination } from '@backend-template/server';
import { Agency, CreateAgencyData } from '@backend-template/types';
import { Selectable, Updateable } from 'kysely';

import { AgencyRepo } from '../../../repo/agencyRepo';
import { AgencyRepoImpl } from '../../../repo/impl/agencyRepoImpl';
import { AgencyService } from '../../admin/agencyService';

export class AgencyServiceImpl implements AgencyService {
  readonly #agencyRepo: AgencyRepo;

  constructor(agencyRepo: AgencyRepo = new AgencyRepoImpl()) {
    this.#agencyRepo = agencyRepo;
  }

  create(data: CreateAgencyData): Promise<Selectable<Agency>> {
    return this.#agencyRepo.create(data).unwrapOrThrow();
  }

  findAll(pagination: Pagination): Promise<Selectable<Agency>[]> {
    return this.#agencyRepo.findAll(pagination).unwrapOrThrow();
  }

  findById(id: string): Promise<Selectable<Agency>> {
    return this.#agencyRepo.findById(id).unwrapOrThrow();
  }

  update(id: string, data: Agency): Promise<Updateable<Agency>> {
    return this.#agencyRepo.updateById(id, data).unwrapOrThrow();
  }
}
