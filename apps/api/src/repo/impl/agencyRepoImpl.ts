import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import { Agency, CreateAgencyData, DB } from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { AgencyRepo } from '../agencyRepo';

export class AgencyRepoImpl implements AgencyRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  create(data: CreateAgencyData): IOptional<Selectable<Agency>> {
    return Optional.of(
      this.#client
        .insertInto('Agency')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<Agency>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('Agency')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string): IOptional<Selectable<Agency>> {
    return Optional.of(
      this.#client
        .selectFrom('Agency')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(
    id: string,
    data: CreateAgencyData
  ): IOptional<Selectable<Agency>> {
    return Optional.of(
      this.#client
        .updateTable('Agency')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
