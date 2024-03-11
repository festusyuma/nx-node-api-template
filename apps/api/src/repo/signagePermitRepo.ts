import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

import { PaginationData } from '../utils/schema/paginationSchema';
import {
  CreateSignagePermitData,
  UpdateSignagePermitData,
} from '../utils/schema/signagePermitSchema';
import { DB } from '../utils/types';

@Injectable()
export class SignagePermitRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateSignagePermitData) {
    return Optional.of(
      this.client
        .insertInto('SignagePermit')
        .values(data)
        .returningAll()
        .execute()
    ).elseThrow();
  }

  update(id: string, data: UpdateSignagePermitData) {
    return Optional.of(
      this.client
        .updateTable('SignagePermit')
        .set(data)
        .where('id', '=', id)
        .execute()
    ).elseThrow();
  }

  findAll(pagination: PaginationData) {
    const { page, size } = pagination;
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .offset((page - 1) * size)
        .limit(size)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findBySignageIdAndId(id: string, signage_id: string) {
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .where('id', '=', id)
        .where('signageId', '=', signage_id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findByPaymentId(id: string) {
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .where('paymentId', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  findBySignageId(id: string) {
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .where('signageId', '=', id)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  findLatestPermit(id: string) {
    return Optional.of(
      this.client
        .selectFrom('SignagePermit')
        .where('signageId', '=', id)
        .where('expiryDate', '<', DateTime.now().toJSDate())
        .orderBy('created_at desc')
        .selectAll()
        .executeTakeFirst()
    ).elseThrow();
  }

  updateById(id: string, data: UpdateSignagePermitData) {
    return Optional.of(
      this.client
        .updateTable('SignagePermit')
        .set(data)
        .returningAll()
        .where('id', '=', id)
        .execute()
    ).elseThrow();
  }

  updateBySignageIdAndPermitId(
    id: string,
    signage_id: string,
    data: UpdateSignagePermitData
  ) {
    return Optional.of(
      this.client
        .updateTable('SignagePermit')
        .set(data)
        .returningAll()
        .where('id', '=', id)
        .where('signageId', '=', signage_id)
        .execute()
    ).elseThrow();
  }

  updateByPaymentId(id: string, data: UpdateSignagePermitData) {
    return Optional.of(
      this.client
        .updateTable('SignagePermit')
        .set(data)
        .returningAll()
        .where('paymentId', '=', id)
        .execute()
    ).elseThrow();
  }
}
