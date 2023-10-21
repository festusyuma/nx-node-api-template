import { Controller, Res } from '@backend-template/server';
import {
  forgotPasswordSchema,
  loginSchema,
  recoverUsernameSchema,
} from '@backend-template/types';
import { Request } from 'express';

import { AuthService } from '../services/authService';
import { AuthServiceImpl } from '../services/impl/authServiceImpl';

export class AuthController extends Controller {
  readonly #authService: AuthService;

  constructor(authService: AuthService = new AuthServiceImpl()) {
    super();
    this.#authService = authService;
  }

  async login(req: Request) {
    const { username, password } = this.validate(
      { schema: loginSchema },
      req.body
    );
    const data = await this.#authService.login(username, password);

    return Res.success(data);
  }

  async recoverUsername(req: Request) {
    const { email } = this.validate(
      { schema: recoverUsernameSchema },
      req.body
    );
    const data = await this.#authService.recoverUsername(email);
    return Res.success(data);
  }

  async forgotPassword(req: Request) {
    const { email } = this.validate({ schema: forgotPasswordSchema }, req.body);
    const data = await this.#authService.forgotPassword(email);
    return Res.success(data);
  }
}
