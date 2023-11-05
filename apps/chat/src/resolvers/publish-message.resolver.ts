import { Context, util } from '@aws-appsync/utils';

export function request(ctx: Context) {
  const topicArn = util.urlEncode(ctx.prev.result.topicArn);
  const body = `Action=Publish&Version=2010-03-31&TopicArn=${topicArn}`;
  const message = util.urlEncode(
    JSON.stringify({ pattern: 'NEW_MESSAGE', data: ctx.args.input })
  );

  return {
    version: '2018-05-29',
    method: 'POST',
    resourcePath: '/',
    params: {
      body: `${body}&Message=${message}`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    },
  };
}

export function response(ctx: Context) {
  return ctx.prev.result;
}
