import { Module } from '@nestjs/common';

import { BusinessModule as MainBusinessModule } from '../../business/business.module';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessDocumentModule } from './businessDocument/businessDocument.module';
import { BusinessLocationModule } from './businessLocation/businessLocation.module';
import { PaymentModule } from './payment/payment.module';
import SignageModule from './signage/signage.module';

@Module({
  imports: [
    BusinessDocumentModule,
    BusinessLocationModule,
    MainBusinessModule,
    PaymentModule,
    SignageModule,
  ],
  exports: [
    BusinessDocumentModule,
    BusinessLocationModule,
    PaymentModule,
    SignageModule,
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
