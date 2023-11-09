import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';

import { SecretsService } from '../secrets/secrets.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
