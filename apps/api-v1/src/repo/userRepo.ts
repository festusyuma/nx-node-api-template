import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { CreateUserData, UpdateUserData } from '../utils/schema/userSchema';

@Injectable()
export class UserRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateUserData) {
    return Optional.of(
      this.client
        .insertInto('User')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll() {
    const { page, size } = { page: 1, size: 10 };
    return Optional.of(
      this.client
        .selectFrom('User')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }

  findByUsername(username: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .leftJoin('Role', 'Role.id', 'User.id')
        .select(['id', 'username', 'email', 'Role.name as role', 'password'])
        .where('username', '=', username)
        .executeTakeFirst()
    );
  }

  findByEmail(email: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .where('username', '=', email)
        .selectAll()
        .executeTakeFirst()
    );
  }

  updateById(id: string, data: UpdateUserData) {
    return Optional.of(
      this.client
        .updateTable('User')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }

  updatePasswordById(id: string, password: string) {
    return Optional.of(
      this.client
        .updateTable('User')
        .set({ password })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    );
  }
}
