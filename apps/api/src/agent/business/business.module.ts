import { Module } from '@nestjs/common';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessDocumentModule } from './businessDocument/businessDocument.module';
import { BusinessLocationModule } from './businessLocation/businessLocation.module';

@Module({
  imports: [BusinessDocumentModule, BusinessLocationModule],
  exports: [BusinessDocumentModule, BusinessLocationModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
