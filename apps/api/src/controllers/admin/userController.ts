import { Controller, Res } from '@backend-template/server';
import { CreateUserSchema } from '@backend-template/types';
import { Request } from 'express';

import { UserService } from '../../services/admin/userService';
import { UserServiceImpl } from '../../services/impl/admin/userServiceImpl';

export class UserController extends Controller {
  readonly #userService: UserService;

  constructor(userService: UserService = new UserServiceImpl()) {
    super();
    this.#userService = userService;
  }

  async create(req: Request) {
    const data = this.validate({ schema: CreateUserSchema }, req.body);

    const result = await this.#userService.create(data);

    return Res.success(result);
  }

  async findAll(req: Request) {
    const pagination = this.pagination(req);
    const result = await this.#userService.findAll(pagination);
    return Res.success({ result: result, pagination: pagination });
  }
}
