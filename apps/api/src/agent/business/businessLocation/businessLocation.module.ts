import { Module } from '@nestjs/common';

import { BusinessLocationController } from './businessLocation.controller';
import { BusinessLocationService } from './businessLocation.service';

@Module({
  controllers: [BusinessLocationController],
  providers: [BusinessLocationService],
})
export class BusinessLocationModule {}
