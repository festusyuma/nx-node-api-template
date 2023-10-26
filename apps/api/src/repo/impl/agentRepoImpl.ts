import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  DB,
  UpdateAgentData,
} from '@backend-template/types';
import { Kysely, Selectable, Updateable } from 'kysely';

import { AgentRepo } from '../agentRepo';

export class AgentRepoImpl implements AgentRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }
  create(data: CreateAgentData): IOptional<Selectable<Agent>> {
    return Optional.of(
      this.#client
        .insertInto('Agent')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<Agent>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('Agent')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string): IOptional<Selectable<Agent>> {
    return Optional.of(
      this.#client
        .selectFrom('Agent')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: UpdateAgentData): IOptional<Updateable<Agent>> {
    return Optional.of(
      this.#client
        .updateTable('Agent')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
