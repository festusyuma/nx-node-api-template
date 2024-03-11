import { Global, Module } from '@nestjs/common';

import { AgencyRepo } from './agencyRepo';
import { AgentRepo } from './agentRepo';
import { BusinessDocumentRepo } from './businessDocumentRepo';
import { BusinessLocationRepo } from './businessLocationRepo';
import { BusinessRepo } from './businessRepo';
import { OtpRepo } from './optRepo';
import { PaymentTypeRepo } from './paymentTypeRepo';
import { RoleRepo } from './roleRepo';
import { SignagePermitRepo } from './signagePermitRepo';
import { SignageRepo } from './signageRepo';
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
    SignageRepo,
    SignagePermitRepo,
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
    SignageRepo,
    SignagePermitRepo,
  ],
})
export class RepoModule {}
