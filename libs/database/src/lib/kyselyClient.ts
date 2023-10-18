import { DB } from '@backend-template/types';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

let kyselyClient: Kysely<DB>;

export function getKyselyClient(
  dbUrl: string | undefined = process.env.DATABASE_URL
) {
  if (!kyselyClient) {
    const dialect = new PostgresDialect({
      pool: new Pool({
        connectionString: dbUrl,
      }),
    });

    kyselyClient = new Kysely<DB>({
      dialect,
    });
  }

  return kyselyClient;
}
