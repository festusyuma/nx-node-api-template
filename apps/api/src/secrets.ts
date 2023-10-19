import { loadSecrets } from '@backend-template/secrets';
import { z } from 'zod';

const secretsSchema = z.object({
  name: z.string(),
});

let secrets: z.infer<typeof secretsSchema>;

export async function getSecrets() {
  if (!secrets) {
    const fetchedSecrets = await loadSecrets(secretsSchema, ['']);
    if (fetchedSecrets) secrets = fetchedSecrets;
  }
  return secrets;
}
