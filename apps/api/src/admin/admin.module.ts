import { Module } from '@nestjs/common';

import { AgencyController } from './agency/agency.controller';
import { AgencyService } from './agency/agency.service';
import { AgentController } from './agent/agent.controller';
import { AgentService } from './agent/agent.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  controllers: [AgencyController, AgentController, UserController],
  providers: [AgencyService, AgentService, UserService],
})
export class AdminModule {}
