import { DynamoService } from '@backend-template/database';
import { CognitoService } from '@backend-template/http';
import { MESSAGE_MANAGER, Sns } from '@backend-template/messaging';
import { Global, Module } from '@nestjs/common';

import { SecretsModule } from '../secrets/secrets.module';
import { SecretsService } from '../secrets/secrets.service';

@Global()
@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: DynamoService,
      inject: [SecretsService],
      useFactory: (secrets: SecretsService) => {
        return new DynamoService(secrets.get('AWS_REGION'));
      },
    },
    { provide: MESSAGE_MANAGER, useClass: Sns },
    {
      provide: CognitoService,
      useFactory: (secrets: SecretsService) => {
        return new CognitoService(secrets.get('AWS_REGION'));
      },
      inject: [SecretsService],
    },
  ],
  exports: [DynamoService, MESSAGE_MANAGER, CognitoService],
})
export class LibrariesModule {}
