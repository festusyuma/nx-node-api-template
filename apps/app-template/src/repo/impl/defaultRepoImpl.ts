import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional } from '@backend-template/server';
import { DB, User } from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { DefaultRepo } from '../defaultRepo';

export class DefaultRepoImpl implements DefaultRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  fetchUser(email: string): IOptional<Selectable<User>> {
    return Optional.of(
      this.#client
        .selectFrom('User')
        .where('email', '=', email)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
