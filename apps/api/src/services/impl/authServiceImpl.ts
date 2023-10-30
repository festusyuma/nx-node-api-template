import { Optional, Res } from '@backend-template/server';
import { generateToken } from '@backend-template/token';
import { User } from '@backend-template/types';
import bcrypt from 'bcryptjs';
import * as console from 'console';
import { Selectable } from 'kysely';

import { UserRepo } from '../../repo';
import { UserRepoImpl } from '../../repo/impl/userRepoImpl';
import { AuthService } from '../authService';

export class AuthServiceImpl implements AuthService {
  readonly #userRepo: UserRepo;

  constructor(userRepo: UserRepo = new UserRepoImpl()) {
    this.#userRepo = userRepo;
  }

  async login(
    username: string,
    password: string
  ): Promise<{ user: Selectable<User>; token: string | null } | null> {
    const user = await this.#userRepo
      .findByUsername(username)
      .unwrapOrThrow(Res.unauthorized('Incorrect username or password'));

    const isPassword = await Optional.of(
      bcrypt.compare(password, user.password)
    ).unwrapOrThrow(Res.unauthorized('Incorrect username or password'));

    const token = await generateToken(user, `user_${user.id}_token`);

    if (isPassword) return { user, token };
    return null;
  }

  async forgotPassword(
    email: string,
    verification_type: 'phone' | 'email' = 'email'
  ): Promise<Selectable<User>> {
    const user = await this.#userRepo
      .findByEmail(email)
      .unwrapOrThrow(Res.unauthorized());

    //send_email function
    switch (verification_type) {
      case 'email':
        console.log('sent OTP to email');
        break;
      case 'phone':
        console.log('sent OTP to phone');
        break;
    }
    console.log(user.email, 'reset_password', 'token');

    return user;
  }

  async recoverUsername(
    email: string,
    verification_type: 'email' | 'phone' = 'email'
  ): Promise<Selectable<User>> {
    const user = await this.#userRepo
      .findByEmail(email)
      .unwrapOrThrow(Res.unauthorized());

    switch (verification_type) {
      case 'email':
        console.log('sent OTP to email');
        break;
      case 'phone':
        console.log('sent OTP to phone');
        break;
    }

    //send_email function
    console.log(user.email, 'reset_password', user.username);

    return user;
  }
}
