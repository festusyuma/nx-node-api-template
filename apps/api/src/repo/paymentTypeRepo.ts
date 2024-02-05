import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { PaginationData } from '../utils/schema/paginationSchema';
import {
  CreatePaymentTypeData,
  UpdatePaymentTypeData,
} from '../utils/schema/paymentTypeSchema';
import { DB } from '../utils/types';

@Injectable()
export class PaymentTypeRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreatePaymentTypeData) {
    return Optional.of(
      this.client
        .insertInto('PaymentType')
        .values(data)
        .returningAll()
        .execute()
    ).elseThrow();
  }

  update(id: string, data: UpdatePaymentTypeData) {
    return Optional.of(
      this.client
        .updateTable('PaymentType')
        .where('id', '=', id)
        .set(data)
        .returningAll()
        .execute()
    );
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('PaymentType')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseNull();
  }

  findByAgencyId(id: string, pagination: PaginationData) {
    const { size, page } = pagination;
    return Optional.of(
      this.client
        .selectFrom('PaymentType')
        .where('agencyId', '=', id)
        .offset((page - 1) * size)
        .limit(size)
        .selectAll()
        .execute()
    ).elseThrow();
  }
}
