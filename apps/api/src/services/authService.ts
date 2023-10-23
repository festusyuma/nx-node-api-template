import { Res } from '@backend-template/server';
import { User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface AuthService {
  login(username: string, password: string): Promise<Selectable<User> | null>;
  recoverUsername(email: string): Promise<Selectable<User>>;
  forgotPassword(email: string): Promise<Selectable<User>>;
}
