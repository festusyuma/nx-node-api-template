import serverless from '@vendia/serverless-express';
import { Application } from 'express';

import { IRes, LambdaEvent, LambdaEventSource, Res } from '../utils';

export async function appHandler(
  event: LambdaEvent,
  app: Application,
  sqsHandler?: () => Promise<IRes>,
  sesHandler?: () => Promise<IRes>
) {
  if ('Records' in event) {
    for (const record of event.Records) {
      if (record.eventSource === LambdaEventSource.SQS) console.log('hello');
      // console.log(await sqsHandler?.(JSON.parse(record.body) as SQSBody));
    }

    return Res.success();
  } else {
    return serverless({ app })(event);
  }
}
