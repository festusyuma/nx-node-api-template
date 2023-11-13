import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { DB } from '@backend-template/types';
import { Injectable } from '@nestjs/common';

import {
  CreateBusinessData,
  UpdateBusinessData,
} from '../utils/schema/businessSchema';
import { PaginationData } from '../utils/schema/paginationSchema';

@Injectable()
export class BusinessRepo {
  constructor(private client: KyselyService<DB>) {}
  create(data: CreateBusinessData) {
    return Optional.of(
      this.client
        .insertInto('Business')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('Business')
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Business')
        .where('id', '=', id)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateBusinessData) {
    return Optional.of(
      this.client
        .updateTable('Business')
        .set(data)
        .where('id', '=', id)
        .execute()
    ).elseThrow();
  }
}
