import { IOptional } from '@backend-template/server';
import { User } from '@backend-template/types';

export interface UserRepo {
  findById(id: string): IOptional<User>;
  findByUsername(username: string): IOptional<User>;
  findByEmail(email: string): IOptional<User>;
  updateById(id: string, data: User): IOptional<User>;
}
