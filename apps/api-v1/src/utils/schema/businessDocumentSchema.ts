import { z } from 'zod';

import { BusinessDocumentStatus } from '../types/database';

export const CreateBusinessDocumentSchema = z.object({
  type: z.string(),
  files: z.array(z.string()),
  reasonRejected: z.string(),
  status: z.nativeEnum(BusinessDocumentStatus),
  businessId: z.string(),
});

export type CreateBusinessDocumentData = z.infer<
  typeof CreateBusinessDocumentSchema
>;
