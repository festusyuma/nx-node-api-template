import { Global, Module } from '@nestjs/common';

import { AgencyRepo } from './agencyRepo';
import { AgentRepo } from './agentRepo';
import { BusinessDocumentRepo } from './businessDocumentRepo';
import { BusinessLocationRepo } from './businessLocationRepo';
import { BusinessRepo } from './businessRepo';
import { OtpRepo } from './optRepo';
import { PaymentTypeRepo } from './paymentTypeRepo';
import { RoleRepo } from './roleRepo';
import { TransactionRepo } from './transactionRepo';
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
    RoleRepo,
    PaymentTypeRepo,
    TransactionRepo,
  ],
  exports: [
    AgencyRepo,
    AgentRepo,
    BusinessDocumentRepo,
    BusinessLocationRepo,
    BusinessRepo,
    UserRepo,
    OtpRepo,
    RoleRepo,
    PaymentTypeRepo,
    TransactionRepo,
  ],
})
export class RepoModule {}
