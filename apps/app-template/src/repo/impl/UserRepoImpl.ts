import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional } from '@backend-template/server';
import { DB, User } from '@backend-template/types';
import { Kysely } from 'kysely';

import { UserRepo } from '../userRepo';

export class UserRepoImpl implements UserRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  findById(id: string): IOptional<User> {
    return Optional.of(
      this.#client
        .selectFrom('User')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
