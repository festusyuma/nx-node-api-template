import { Module } from '@nestjs/common';

import { BusinessModule } from './business/business.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DashboardModule, BusinessModule],
  exports: [DashboardModule, BusinessModule],
})
export class AgentModule {}
