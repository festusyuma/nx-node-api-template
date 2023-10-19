import type { ScheduleType, SQSBody } from '@backend-template/types';
import serverless from '@vendia/serverless-express';
import { Application } from 'express';

import type { IRes, LambdaEvent } from '../utils';

export async function appHandler(
  event: LambdaEvent,
  app: Application,
  sqsHandler?: (event: SQSBody) => Promise<IRes>,
  sesHandler?: (scheduleType: ScheduleType) => Promise<IRes>
) {
  console.log('event: ', event);

  if ('Records' in event) {
    for (const record of event.Records) {
      if (record.eventSource === 'aws:sqs')
        console.log(await sqsHandler?.(JSON.parse(record.body) as SQSBody));
    }
  } else if ('scheduleType' in event) {
    console.log(await sesHandler?.(event.scheduleType as ScheduleType));
  } else {
    return serverless({ app })(event);
  }
}
