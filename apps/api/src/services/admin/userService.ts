import { Pagination } from '@backend-template/server';
import { CreateUserData, User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface UserService {
  create(data: CreateUserData): Promise<Selectable<User>>;
  findAll(pagination: Pagination): Promise<Selectable<User>[]>;
}
