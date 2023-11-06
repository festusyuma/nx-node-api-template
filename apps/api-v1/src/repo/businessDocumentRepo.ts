import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';

import { CreateBusinessDocumentData } from '../utils/schema/businessDocumentSchema';

export class BusinessDocumentRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateBusinessDocumentData) {
    return Optional.of(
      this.client
        .insertInto('BusinessDocument')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    );
  }

  findAll() {
    const { page, size } = { page: 1, size: 10 };
    return Optional.of(
      this.client
        .selectFrom('BusinessDocument')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    );
  }

  findByBusinessId(id: string) {
    return Optional.of(
      this.client
        .selectFrom('BusinessDocument')
        .where('businessId', '=', id)
        .selectAll()
        .executeTakeFirst()
    );
  }
}
