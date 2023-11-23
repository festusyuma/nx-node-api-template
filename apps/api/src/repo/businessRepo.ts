import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import {
  CreateBusinessData,
  UpdateBusinessData,
} from '../utils/schema/businessSchema';
import { PaginationData } from '../utils/schema/paginationSchema';
import { DB } from '../utils/types';

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
        .select([
          'id',
          'name',
          'phoneNumber',
          'email',
          'status',
          'created_at',
          'updated_at',
        ])
        .offset((page - 1) * size)
        .limit(size)
        .orderBy('created_at desc')
        .execute()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Business')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findByQrCode(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Business')
        .where('qrCode', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateBusinessData) {
    return Optional.of(
      this.client
        .updateTable('Business')
        .set(data)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }
}
