import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { PaginationData } from '../utils/schema/paginationSchema';
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
    ).elseThrow();
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('User')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findByUsername(username: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .leftJoin('Role', 'User.roleId', 'Role.id')
        .select([
          'User.id',
          'username',
          'email',
          'Role.name as role',
          'password',
        ])
        .where('username', '=', username)
        .executeTakeFirst()
    );
  }

  findByEmail(email: string) {
    return Optional.of(
      this.client
        .selectFrom('User')
        .where('email', '=', email)
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
    ).elseThrow();
  }

  updatePasswordById(id: string, password: string) {
    return Optional.of(
      this.client
        .updateTable('User')
        .set({ password })
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }
}
