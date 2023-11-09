import { Module } from '@nestjs/common';

import { ChannelRepo } from './channel.repo';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

@Module({
  providers: [ChannelResolver, ChannelRepo, ChannelService],
  exports: [ChannelService, ChannelRepo],
})
export class ChannelModule {}
