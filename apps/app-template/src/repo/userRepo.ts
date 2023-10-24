import { IOptional } from '@backend-template/server';
import { User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface UserRepo {
  findById(id: string): IOptional<Selectable<User>>;
}
