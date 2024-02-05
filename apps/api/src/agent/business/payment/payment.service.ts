import { Injectable } from '@nestjs/common';

import { TransactionRepo } from '../../../repo/transactionRepo';
import { CreateTransactionData } from '../../../utils/schema/transactionSchema';

@Injectable()
export class PaymentService {
  constructor(private transactionRepo: TransactionRepo) {}

  async create(data: CreateTransactionData) {
    return await this.transactionRepo.create(data);
  }
}
