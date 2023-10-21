import { Res } from '@backend-template/server';
import { User } from '@backend-template/types';

export interface AuthService {
  login(username: string, password: string): Promise<User | null>;
  recoverUsername(email: string): Promise<User>;
  forgotPassword(email: string): Promise<User>;
}
