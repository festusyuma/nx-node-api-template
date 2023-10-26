import { getKyselyClient } from '@backend-template/database';
import { IOptional, Optional, Pagination } from '@backend-template/server';
import {
  CreateUserData,
  DB,
  UpdateUserData,
  User,
} from '@backend-template/types';
import { Kysely, Selectable } from 'kysely';

import { UserRepo } from '../userRepo';

export class UserRepoImpl implements UserRepo {
  readonly #client: Kysely<DB>;

  constructor(client: Kysely<DB> = getKyselyClient()) {
    this.#client = client;
  }

  create(data: CreateUserData): IOptional<Selectable<User>> {
    console.log(data);
    return Optional.of(
      this.#client
        .insertInto('User')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll(pagination: Pagination): IOptional<Selectable<User>[]> {
    const { page, size } = pagination;
    return Optional.of(
      this.#client
        .selectFrom('User')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string): IOptional<Selectable<User>> {
    return Optional.of(
      this.#client
        .selectFrom('User')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  findByUsername(username: string): IOptional<Selectable<User>> {
    return Optional.of(
      this.#client
        .selectFrom('User')
        .where('username', '=', username)
        .selectAll()
        .executeTakeFirst()
    );
  }

  findByEmail(email: string): IOptional<Selectable<User>> {
    return Optional.of(
      this.#client
        .selectFrom('User')
        .where('username', '=', email)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: UpdateUserData): IOptional<Selectable<User>> {
    return Optional.of(
      this.#client
        .updateTable('User')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
