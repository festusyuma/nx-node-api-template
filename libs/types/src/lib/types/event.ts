export type SQSBody = { action: 'EVENT_ONES'; body: string };

export const ScheduleType = {
  SCHEDULE_ONE: 'SCHEDULE_ONE',
} as const;

export type ScheduleType = typeof ScheduleType[keyof typeof ScheduleType];
