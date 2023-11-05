import { Context } from '@aws-appsync/utils';
import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx: Context) {
  return ddb.query({
    index: 'byProfile',
    query: { profileId: { eq: ctx.args.profileId } },
    nextToken: ctx.args.nextToken,
    limit: ctx.args.limit,
  });
}

export function response(ctx: Context) {
  const { items: channels = [], nextToken } = ctx.result;
  return { channels, nextToken };
}
