import { IOptional } from '@backend-template/server';
import { CreateUserData, User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface UserRepo {
  create(data: CreateUserData): IOptional<Selectable<User>>;
  findById(id: string): IOptional<Selectable<User>>;
  findByUsername(username: string): IOptional<Selectable<User>>;
  findByEmail(email: string): IOptional<Selectable<User>>;
  updateById(id: string, data: User): IOptional<Selectable<User>>;
}
