import { CognitoService, CustomRes } from '@backend-template/http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private cognitoService: CognitoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    try {
      ctx.token = ctx.req.headers.authorization.split(' ')[1];

      if (ctx.token) {
        ctx.user = await this.cognitoService.getUser(ctx.token);
      }
    } catch (e) {
      /* empty */
    }

    if (!ctx.user) throw CustomRes.unauthorized();

    return true;
  }
}
