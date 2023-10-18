import { IOptional } from '@backend-template/server';
import { User } from '@backend-template/types';

export interface UserRepo {
  findById(id: string): IOptional<User>;
}
