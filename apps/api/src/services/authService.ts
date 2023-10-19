import { IRes } from '@backend-template/server';

export interface AuthService {
  login(username: string, password: string): Promise<IRes>;
  recoverUsername(email: string): Promise<IRes>;
  forgotPassword(email: string): Promise<IRes>;
}
