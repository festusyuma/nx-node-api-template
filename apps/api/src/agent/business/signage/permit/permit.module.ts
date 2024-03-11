import { Module } from '@nestjs/common';

import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';

@Module({
  controllers: [PermitController],
  providers: [PermitService],
})
export default class PermitModule {}
