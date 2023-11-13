import { KyselyService } from '@backend-template/database';
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
    AuthenticatedGuard,
  ],
  exports: [KyselyService, AuthenticatedGuard],
})
export class LibrariesModule {}
