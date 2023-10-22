import { IOptional } from '@backend-template/server';
import { User } from '@backend-template/types';

export interface DefaultRepo {
  fetchUser(email: string): IOptional<User>;
}
