import { Module } from '@nestjs/common';

import { BusinessDocumentController } from './businessDocument.controller';
import { BusinessDocumentService } from './businessDocument.service';

@Module({
  controllers: [BusinessDocumentController],
  providers: [BusinessDocumentService],
})
export class BusinessDocumentModule {}
