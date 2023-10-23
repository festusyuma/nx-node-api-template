import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional } from '@backend-template/server';
import {
  Agent,
  CreateAgentData,
  CreateUserData,
  DB,
  UpdateAgentData,
  User,
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

  findAll(): IOptional<Selectable<Agent>[]> {
    return Optional.of(this.#client.selectFrom('Agent').selectAll().execute());
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
