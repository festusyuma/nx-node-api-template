import { DynamoService, KyselyService } from '@backend-template/database';
import { MESSAGE_MANAGER, Sns } from '@backend-template/messaging';
import { Global, Module } from '@nestjs/common';

import { SecretsModule } from '../secrets/secrets.module';
import { SecretsService } from '../secrets/secrets.service';
import { AuthenticatedGuard } from './authenticated.guard';

@Global()
@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: KyselyService,
      inject: [SecretsService],
      useFactory: (secrets: SecretsService) => {
        return new KyselyService(secrets.get('DATABASE_URL'));
      },
    },
    {
      provide: DynamoService,
      inject: [SecretsService],
      useFactory: (secrets: SecretsService) => {
        return new DynamoService(secrets.get('AWS_REGION'));
      },
    },
    { provide: MESSAGE_MANAGER, useClass: Sns },

    AuthenticatedGuard,
  ],
  exports: [KyselyService, DynamoService, MESSAGE_MANAGER, AuthenticatedGuard],
})
export class LibrariesModule {}
