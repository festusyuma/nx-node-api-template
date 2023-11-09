import { Module } from '@nestjs/common';

import { ChannelModule } from '../channel/channel.module';
import { ProfileModule } from '../profile/profile.module';
import { ChannelMemberRepo } from './channel-member.repo';
import { ChannelMemberResolver } from './channel-member.resolver';
import { ChannelMemberService } from './channel-member.service';

@Module({
  imports: [ChannelModule, ProfileModule],
  providers: [ChannelMemberResolver, ChannelMemberService, ChannelMemberRepo],
  exports: [ChannelMemberService],
})
export class ChannelMemberModule {}
