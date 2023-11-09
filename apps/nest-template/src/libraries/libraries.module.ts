import { Global, Module } from '@nestjs/common';

import { SecretsModule } from '../secrets/secrets.module';

@Global()
@Module({
  imports: [SecretsModule],
  exports: [],
})
export class LibrariesModule {}
