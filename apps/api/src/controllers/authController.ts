import { Controller } from '@backend-template/server';
import { AuthService } from '../services/authService';
import { AuthServiceImpl } from '../services/impl/authServiceImpl';
import { Request } from 'express';

export class AuthController extends Controller {
  readonly #authService: AuthService;

  constructor(authService: AuthService = new AuthServiceImpl()) {
    super();
    this.#authService = authService;
  }

  async login(req: Request) {
    const { username, password } = req.body;
    return this.#authService.login(username, password);
  }

  async recoverUsername(req: Request) {
    const { email } = req.body;
    return await this.#authService.recoverUsername(email);
  }

  async forgotPassword(req: Request) {
    const { email } = req.body;
    return await this.#authService.forgotPassword(email);
  }
}
