import { Module } from '@nestjs/common';

import { AdminModule } from './admin/admin.module';
import { AgencyModule } from './agency/agency.module';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { LibrariesModule } from './libraries/libraries.module';
import { RepoModule } from './repo/repo.module';
import { SecretsModule } from './secrets/secrets.module';

@Module({
  imports: [
    LibrariesModule,
    SecretsModule,
    RepoModule,
    AuthModule,
    AdminModule,
    AgencyModule,
    AgentModule,
  ],
})
export class AppModule {}
