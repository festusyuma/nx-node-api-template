import { Module } from '@nestjs/common';

import { BusinessModule as MainBusinessModule } from '../../business/business.module';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessDocumentModule } from './businessDocument/businessDocument.module';
import { BusinessLocationModule } from './businessLocation/businessLocation.module';

@Module({
  imports: [BusinessDocumentModule, BusinessLocationModule, MainBusinessModule],
  exports: [BusinessDocumentModule, BusinessLocationModule],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
