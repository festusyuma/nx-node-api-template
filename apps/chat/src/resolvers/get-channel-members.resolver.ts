import { Context } from '@aws-appsync/utils';
import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx: Context) {
  return ddb.query({
    index: 'byChannel',
    query: { channelId: { eq: ctx.args.channelId } },
    nextToken: ctx.args.nextToken,
    limit: ctx.args.limit,
  });
}

export function response(ctx: Context) {
  const { items: members = [], nextToken } = ctx.result;
  return { members, nextToken };
}
