import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import {
  CreateSignageData,
  PaginationData,
  UpdateSignageData,
} from '../utils/schema/types';
import { DB } from '../utils/types';

@Injectable()
export class SignageRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateSignageData) {
    return Optional.of(
      this.client
        .insertInto('Signage')
        .values(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateSignageData) {
    return Optional.of(
      this.client
        .updateTable('Signage')
        .where('id', '=', id)
        .set(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateBusinessSignageId(
    id: string,
    business_id: string,
    data: UpdateSignageData
  ) {
    return Optional.of(
      this.client
        .updateTable('Signage')
        .where('id', '=', id)
        .where('businessId', '=', business_id)
        .set(data)
        .returningAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Signage')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findByBusinessId(id: string, pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('Signage')
        .where('businessId', '=', id)
        .selectAll()
        .offset((page - 1) * size)
        .limit(size)
        .execute()
    ).elseThrow();
  }

  findBusinessSignageById(id: string, business_id: string) {
    return Optional.of(
      this.client
        .selectFrom('Signage')
        .where('businessId', '=', business_id)
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }
}
