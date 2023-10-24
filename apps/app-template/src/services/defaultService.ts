import { Pagination } from '@backend-template/server';
import { User, UserData } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface DefaultService {
  getUser(
    pagination: Pagination,
    user: UserData | null
  ): Promise<Selectable<User>>;
}
