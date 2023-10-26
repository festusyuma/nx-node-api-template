import { Pagination } from '@backend-template/server';
import { CreateUserData, User } from '@backend-template/types';
import bcrypt from 'bcryptjs';
import { Selectable } from 'kysely';

import { UserRepo } from '../../../repo';
import { UserRepoImpl } from '../../../repo/impl/userRepoImpl';
import { UserService } from '../../admin/userService';

export class UserServiceImpl implements UserService {
  readonly #userRepo: UserRepo;

  constructor(userRepo: UserRepo = new UserRepoImpl()) {
    this.#userRepo = userRepo;
  }
  create(data: CreateUserData): Promise<Selectable<User>> {
    data.password = bcrypt.hashSync(data.password, 10);
    return this.#userRepo.create(data).unwrapOrThrow();
  }

  findAll(pagination: Pagination): Promise<Selectable<User>[]> {
    return this.#userRepo.findAll(pagination).unwrapOrThrow();
  }
}
