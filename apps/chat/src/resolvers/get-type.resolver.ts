import { Context } from '@aws-appsync/utils';
import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx: Context) {
  return ddb.get({ key: { id: ctx.args.id } });
}

export function response(ctx: Context) {
  return ctx.result;
}