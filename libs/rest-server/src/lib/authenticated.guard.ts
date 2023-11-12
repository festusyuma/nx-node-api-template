import { CognitoService, CustomRes } from '@backend-template/http';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      request.token = request.headers.authorization.split(' ')[1];
      if (request.token) {
        request.user = await this.cognitoService.getUser(request.token);
      }
    } catch (e) {
      Logger.error(e, 'authentication error');
    }

    if (!request.user) throw CustomRes.unauthorized();

    return true;
  }
}
