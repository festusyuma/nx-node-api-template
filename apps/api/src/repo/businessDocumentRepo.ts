import { KyselyService } from '@backend-template/database';
import { CustomRes, Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import { CreateBusinessDocumentData } from '../utils/schema/businessDocumentSchema';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class BusinessDocumentRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateBusinessDocumentData) {
    return Optional.of(
      this.client
        .insertInto('BusinessDocument')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessDocument')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow(CustomRes.badRequest('Not found'));
  }

  findByBusinessId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('BusinessDocument')
        .where('businessId', '=', id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .executeTakeFirst()
    ).elseThrow(CustomRes.badRequest('Not found'));
  }
}
