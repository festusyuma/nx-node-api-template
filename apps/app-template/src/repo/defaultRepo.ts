import { IOptional } from '@backend-template/server';
import { User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface DefaultRepo {
  fetchUser(email: string): IOptional<Selectable<User>>;
}
