import { loadSecrets } from '@backend-template/secrets';
import { z } from 'zod';

const secretsSchema = z.object({
  BASE_ROUTE: z.string().optional(),
});

export let secrets: z.infer<typeof secretsSchema>;

export async function getSecrets() {
  const fetchedSecrets = await loadSecrets(secretsSchema, ['']);
  if (fetchedSecrets) secrets = fetchedSecrets;
}
