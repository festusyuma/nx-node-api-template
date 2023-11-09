import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { CognitoService } from './cognito.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      request.token = request.headers.authorization.split(' ')[1];
    } catch (e) {
      /* empty */
    }

    try {
      if (request.token) {
        request.user = await this.cognitoService.getUser(request.token);
      }
    } catch (e) {
      /* empty */
    }

    return true;
  }
}
