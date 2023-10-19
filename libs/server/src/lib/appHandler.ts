import type { ScheduleType, SQSBody } from '@backend-template/types';
import serverless from '@vendia/serverless-express';

import type { AppHandlerTypes, LambdaEvent } from '../utils';
import { Res } from '../utils';

export async function appHandler(
  event: LambdaEvent,
  handlers: AppHandlerTypes
) {
  console.log('event: ', event);

  if ('Records' in event) {
    for (const record of event.Records) {
      if (record.eventSource === 'aws:sqs')
        console.log(
          await handlers.eventHandler?.(JSON.parse(record.body) as SQSBody)
        );
    }

    return Res.success();
  } else if ('scheduleType' in event) {
    return handlers.scheduleHandler?.(event.scheduleType as ScheduleType);
  } else {
    return handlers.app
      ? serverless({ app: handlers.app })(event)
      : Res.failed('no handler for this event');
  }
}
