import { z } from 'zod';

import { TaskType } from "../types";

export const assignTaskSchema = z.object({
  agentId: z.string(),
  businessId: z.string(),
  signageId: z.string(),
  type: z.nativeEnum(TaskType)
}).refine((data) => {
    if (data.type === 'BUSINESS_VERIFICATION' && !data.businessId) {
      return false;
    }
    return !(data.type === 'SIGNAGE_VERIFICATION' && !data.signageId);
  }, {
    message: "Please enter the required field based on the task type",
  });

export type assignTaskData = z.infer<typeof assignTaskSchema>;
