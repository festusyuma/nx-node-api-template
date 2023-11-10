import { Module } from '@nestjs/common';

import { BusinessDocumentModule } from './businessDocument/businessDocument.module';
import { BusinessLocationModule } from './businessLocation/businessLocation.module';

@Module({
  imports: [BusinessDocumentModule, BusinessLocationModule],
  exports: [BusinessDocumentModule, BusinessLocationModule],
})
export class BusinessModule {}
