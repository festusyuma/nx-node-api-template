import { Global, Module } from '@nestjs/common';

import { AgencyRepo } from './agencyRepo';
import { AgentRepo } from './agentRepo';
import { BusinessDocumentRepo } from './businessDocumentRepo';
import { BusinessLocationRepo } from './businessLocationRepo';
import { BusinessRepo } from './businessRepo';
import { UserRepo } from './userRepo';

@Global()
@Module({
  providers: [
    AgencyRepo,
    AgentRepo,
    BusinessDocumentRepo,
    BusinessLocationRepo,
    BusinessRepo,
    UserRepo,
  ],
  exports: [
    AgencyRepo,
    AgentRepo,
    BusinessDocumentRepo,
    BusinessLocationRepo,
    BusinessRepo,
    UserRepo,
  ],
})
export class RepoModule {}
