import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import { Business, CreateBusinessData, DB } from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { BusinessRepo } from '../businessRepo';

export class BusinessRepoImpl implements BusinessRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }
  create(data: CreateBusinessData): IOptional<Selectable<Business>> {
    return Optional.of(
      this.#client
        .insertInto('Business')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<Business>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('Business')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }
}
