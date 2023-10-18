import { User } from '@backend-template/types';

export interface DefaultService {
  getUser(): Promise<User>;
}
