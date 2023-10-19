import { IRes, Res } from '@backend-template/server';
import { ScheduleType } from '@backend-template/types';

export async function scheduleHandler(scheduleType: ScheduleType): Promise<IRes> {
  switch (scheduleType) {
    case 'SCHEDULE_ONE':
      return Res.success('verification reminder event');
    default:
      return Res.failed('no handler for event');
  }
}
