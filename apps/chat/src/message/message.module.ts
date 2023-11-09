import { Module } from '@nestjs/common';

import { ChannelModule } from '../channel/channel.module';
import { ChannelMemberModule } from '../channel-member/channel-member.module';
import { MessageRepo } from './message.repo';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [ChannelModule, ChannelMemberModule],
  providers: [MessageResolver, MessageService, MessageRepo],
})
export class MessageModule {}
