import { Pagination } from '@backend-template/server';
import { User, UserData } from '@backend-template/types';

export interface DefaultService {
  getUser(pagination: Pagination, user: UserData | null): Promise<User>;
}
