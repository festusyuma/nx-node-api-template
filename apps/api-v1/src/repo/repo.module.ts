import { Global, Module } from '@nestjs/common';

import { AgencyRepo } from './agencyRepo';
import { AgentRepo } from './agentRepo';
import { BusinessDocumentRepo } from './businessDocumentRepo';
import { BusinessLocationRepo } from './businessLocationRepo';
import { BusinessRepo } from './businessRepo';
import { OtpRepo } from './optRepo';
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
    OtpRepo,
  ],
  exports: [
    AgencyRepo,
    AgentRepo,
    BusinessDocumentRepo,
    BusinessLocationRepo,
    BusinessRepo,
    UserRepo,
    OtpRepo,
  ],
})
export class RepoModule {}
