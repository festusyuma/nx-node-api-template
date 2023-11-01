import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import {
  BusinessDocument,
  CreateBusinessDocumentData,
  DB,
} from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { BusinessDocumentRepo } from '../businessDocumentRepo';

export class BusinessDocumentRepoImpl implements BusinessDocumentRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  create(
    data: CreateBusinessDocumentData
  ): IOptional<Selectable<BusinessDocument>> {
    return Optional.of(
      this.#client
        .insertInto('BusinessDocument')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<BusinessDocument>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('BusinessDocument')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findByBusinessId(id: string): IOptional<Selectable<BusinessDocument>> {
    return Optional.of(
      this.#client
        .selectFrom('BusinessDocument')
        .where('businessId', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
