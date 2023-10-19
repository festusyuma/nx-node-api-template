import { IRes, Pagination } from '@backend-template/server';
import { Res } from '@backend-template/server';
import { User, UserData } from '@backend-template/types';
import * as console from 'console';

import { UserRepo } from '../../repo';
import { UserRepoImpl } from '../../repo/impl/UserRepoImpl';
import { AuthService } from '../authService';
import bcrypt from 'bcryptjs';
import { generateToken } from '@backend-template/token';
export class AuthServiceImpl implements AuthService {
  readonly #userRepo: UserRepo;

  constructor(userRepo: UserRepo = new UserRepoImpl()) {
    this.#userRepo = userRepo;
  }

  async getUser(pagination: Pagination, userData: UserData | null) {
    const user = await this.#userRepo
      .findByEmail('festusyuma@gmail.com')
      .unwrapOrThrow();

    console.log({ userData, pagination });

    return user;
  }

  async forgotPassword(
    email: string,
    verification_type: 'phone' | 'email' = 'email'
  ): Promise<IRes> {
    const user = await this.#userRepo
      .findByEmail(email)
      .unwrapOrThrow(Res.unauthorized());

    //send_email function
    console.log(user.email, 'reset_password', 'token');

    return Res.success('OTP sent');
  }

  async login(username: string, password: string): Promise<IRes> {
    // check username
    const user = await this.#userRepo
      .findByUsername(username)
      .unwrapOrThrow(Res.unauthorized('username or password incorrect'));

    //check password
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) return Res.unauthorized('username or password incorrect');

    const payload = {
      id: user.id,
      username: user.username,
      role: user.roleId,
      email: user.email,
    };

    //generate token
    const token = await generateToken(payload, `user_${user.id}_token`);
    return Res.success({ user: payload, token: token });
  }

  async recoverUsername(email: string): Promise<IRes> {
    const user = await this.#userRepo
      .findByEmail(email)
      .unwrapOrThrow(Res.unauthorized());

    //send_email function
    console.log(user.email, 'reset_password', user.username);

    return Res.success('OTP sent');
  }
}
