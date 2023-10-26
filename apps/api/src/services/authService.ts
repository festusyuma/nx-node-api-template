import { User } from '@backend-template/types';
import { Selectable } from 'kysely';

export interface AuthService {
  login(
    username: string,
    password: string
  ): Promise<{ user: Selectable<User>; token: string | null } | null>;
  recoverUsername(email: string): Promise<Selectable<User>>;
  forgotPassword(email: string): Promise<Selectable<User>>;
}
