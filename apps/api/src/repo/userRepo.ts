import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { PaginationData } from '../utils/schema/paginationSchema';
import { CreateUserData, UpdateUserData } from '../utils/schema/userSchema';
import { DB, UserStatus } from '../utils/types';

@Injectable()
export class UserRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateUserData) {
    return Optional.of(
      this.client
        .insertInto('User')
        .values({ ...data, status: UserStatus.ACTIVE })
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
          'status',
          'Role.key as role',
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

  updateStatusById(id: string, status: UserStatus) {
    return Optional.of(
      this.client
        .updateTable('User')
        .set({ status: status })
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
