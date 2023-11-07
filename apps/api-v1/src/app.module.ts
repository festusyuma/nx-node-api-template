import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from './app/app.controller';
import { AppRepo } from './app/app.repo';
import { AppService } from './app/app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthenticatedGuard } from './libraries/authenticated.guard';
import { LibrariesModule } from './libraries/libraries.module';
import { RepoModule } from './repo/repo.module';
import { SecretsModule } from './secrets/secrets.module';
import { SecretsService } from './secrets/secrets.service';

@Module({
  imports: [
    LibrariesModule,
    SecretsModule,
    CacheModule.registerAsync({
      useFactory: async (secrets: SecretsService) => {
        return {
          isGlobal: true,
          store: await redisStore({ url: secrets.get('REDIS_URL') }),
        };
      },
      inject: [SecretsService],
      isGlobal: true,
    }),
    RepoModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AppRepo,
    AuthService,
    { provide: APP_GUARD, useClass: AuthenticatedGuard },
  ],
})
export class AppModule {}
