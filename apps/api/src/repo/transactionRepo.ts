import { KyselyService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import {
  CreateTransactionData,
  TransactionStatusData,
  UpdateTransactionData,
} from '../utils/schema/transactionSchema';
import { DB } from '../utils/types';

@Injectable()
export class TransactionRepo {
  constructor(private client: KyselyService<DB>) {}

  create(data: CreateTransactionData) {
    const reference = this.generateReferenceId();
    console.log(reference);
    return Optional.of(
      this.client
        .insertInto('Transaction')
        .values({ ...data, reference: reference })
        .returningAll()
        .execute()
    ).elseThrow();
  }

  update(id: string, data: UpdateTransactionData) {
    return Optional.of(
      this.client
        .updateTable('Transaction')
        .where('id', '=', id)
        .set(data)
        .returningAll()
        .execute()
    );
  }

  findById(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Transaction')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()
    ).elseNull();
  }

  findByReference(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Transaction')
        .where('reference', '=', id)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  findByBusinessId(id: string) {
    return Optional.of(
      this.client
        .selectFrom('Transaction')
        .where('businessId', '=', id)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  findByStatus(status: TransactionStatusData) {
    return Optional.of(
      this.client
        .selectFrom('Transaction')
        .where('status', '=', status)
        .selectAll()
        .execute()
    ).elseThrow();
  }

  generateReferenceId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referenceId = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      referenceId += characters.charAt(randomIndex);
    }

    return referenceId;
  }
}
