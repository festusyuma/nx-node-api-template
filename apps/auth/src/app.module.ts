import { DefaultInterceptor } from '@backend-template/rest-server';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { LibrariesModule } from './libraries/libraries.module';
import { SecretsModule } from './secrets/secrets.module';

@Module({
  imports: [LibrariesModule, SecretsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: DefaultInterceptor },
  ],
})
export class AppModule {}
