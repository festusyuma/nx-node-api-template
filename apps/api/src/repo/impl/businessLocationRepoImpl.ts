import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import {
  BusinessLocation,
  CreateBusinessLocationData,
  DB,
  UserData,
} from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { BusinessLocationRepo } from '../businessLocationRepo';

export class BusinessLocationRepoImpl implements BusinessLocationRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  create(
    data: CreateBusinessLocationData
  ): IOptional<Selectable<BusinessLocation>> {
    return Optional.of(
      this.#client
        .insertInto('BusinessLocation')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<BusinessLocation>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('BusinessLocation')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }
  findAllByAgentId(
    user: UserData,
    pagination: Pagination
  ): IOptional<Selectable<BusinessLocation>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('BusinessLocation')
        .where('agentId', '=', user.id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findAgentRegisteredBusinessCount(
    user: UserData
  ): IOptional<Selectable<object>> {
    return Optional.of(
      this.#client
        .selectFrom('BusinessLocation')
        .where('agentId', '=', user.id)
        .select((eb) =>
          eb.fn.countAll<number>().as('AgentRegisteredBusinessCount')
        )
        .executeTakeFirst()
    );
  }
}
