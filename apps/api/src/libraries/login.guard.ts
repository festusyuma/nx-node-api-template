import { CustomRes } from '@backend-template/helpers';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { SecretsService } from '../secrets/secrets.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private secrets: SecretsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    let token = req.headers.authorization;

    if (!token) {
      throw CustomRes.unauthorized('Access Denied / Unauthorized request');
    }
    token = token.split(' ')[1];

    try {
      req.user = jwt.verify(token, this.secrets.get('SECRET_KEY'));
    } catch (e) {
      throw CustomRes.unauthorized('Access Denied / Unauthorized request');
      /* empty */
    }

    return true;
  }
}
