import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { SecretsService } from '../secrets/secrets.service';
import { UserData } from '../utils/schema/auth';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private secrets: SecretsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      request.token = request.headers.authorization.split(' ')[1];
    } catch (e) {
      /* empty */
    }

    try {
      request.user = jwt.verify(
        request.token,
        this.secrets.get('SECRET_KEY')
      ) as UserData;
    } catch (e) {
      /* empty */
    }

    return true;
  }
}
