import { Context, util } from '@aws-appsync/utils';
import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx: Context) {
  return ddb.put({ key: { id: util.autoId() }, item: ctx.args.input });
}

export function response(ctx: Context) {
  return ctx.result;
}
