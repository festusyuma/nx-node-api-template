import { DateTime } from 'luxon';
import { z, ZodObject, ZodRawShape } from 'zod';

import { fetchSecret } from './fetchSecret';

let initialized: DateTime;
export const loadSecrets = async <
  TD extends ZodRawShape,
  TS extends ZodObject<TD>
>(
  schema: TS,
  secretNames: string[]
): Promise<z.infer<TS> | undefined> => {
  if (!initialized || initialized < DateTime.now().minus({ minutes: 10 })) {
    initialized = DateTime.now();
    const secrets: Record<string, unknown> = {};

    for (const secret in secretNames) {
      Object.assign(secrets, await fetchSecret(secretNames[secret]));
    }

    Object.assign(secrets, process.env);
    Object.assign(process.env, secrets);

    const res = schema.safeParse(secrets);

    if (!res.success) throw Error('error validating secrets');
    else return res.data;
  }
};
