import { IRes, Res } from '@backend-template/server';
import { SQSBody } from '@backend-template/types';

export async function sqsHandler(event: SQSBody): Promise<IRes> {
  switch (event.action) {
    case 'EVENT_ONES':
      return Res.success('event one occurred');
    default:
      return Res.failed('no handler for this event');
  }
}
