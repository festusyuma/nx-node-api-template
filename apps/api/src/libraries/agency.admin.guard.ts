import { CustomRes } from '@backend-template/helpers';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAgencyAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const user = req.user;

    if (user.role != 'agency') throw CustomRes.forbidden();

    return true;
  }
}
