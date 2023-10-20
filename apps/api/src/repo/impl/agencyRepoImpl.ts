import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import { DB, Agency, User } from '@backend-template/types';
import { Kysely } from 'kysely';
import { AgencyRepo } from '../agencyRepo';

export class AgencyRepoImpl implements AgencyRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  create(data: Agency): IOptional<Agency> {
    return Optional.of(
      this.#client
        .insertInto('Agency')
        .values({ ...data })
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(): IOptional<Agency[]> {
    return Optional.of(this.#client.selectFrom('Agency').selectAll().execute());
  }

  findById(id: string): IOptional<Agency> {
    return Optional.of(
      this.#client
        .selectFrom('Agency')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: Agency): IOptional<Agency> {
    return Optional.of(
      this.#client
        .updateTable('Agency')
        .set({ ...data })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
