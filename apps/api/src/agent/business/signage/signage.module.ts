import { Module } from '@nestjs/common';

import PermitModule from './permit/permit.module';
import { SignageController } from './signage.controller';
import { SignageService } from './signage.service';

@Module({
  imports: [PermitModule],
  exports: [PermitModule],
  controllers: [SignageController],
  providers: [SignageService],
})
export default class SignageModule {}
