import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';

import { CreateBusinessData } from '../utils/schema/businessSchema';

export class BusinessRepo {
  constructor(private client: KyselyService<DB>) {}
  create(data: CreateBusinessData) {
    return Optional.of(
      this.client
        .insertInto('Business')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll() {
    const { page, size } = { page: 1, size: 10 };
    return Optional.of(
      this.client
        .selectFrom('Business')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }
}
