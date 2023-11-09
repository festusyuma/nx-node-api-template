import { Module } from '@nestjs/common';

import { ProfileRepo } from './profile.repo';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileResolver, ProfileService, ProfileRepo],
  exports: [ProfileService, ProfileRepo],
})
export class ProfileModule {}
