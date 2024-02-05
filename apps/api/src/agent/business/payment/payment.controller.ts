import { CustomRes, ZodValidationPipe } from '@backend-template/helpers';
import { Body, Controller, Post } from '@nestjs/common';

import { createTransactionSchema } from '../../../utils/schema';
import { CreateTransactionData } from '../../../utils/schema/transactionSchema';
import { PaymentService } from './payment.service';

@Controller('agent/business/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('initiate')
  async initiate(
    @Body(new ZodValidationPipe(createTransactionSchema))
    data: CreateTransactionData
  ) {
    return CustomRes.success(await this.paymentService.create(data));
  }
}
