import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/graphql-server';
import { UserData } from '@backend-template/types';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ChannelService } from '../channel/channel.service';
import { ChannelMemberService } from '../channel-member/channel-member.service';
import { Message, NewMessage } from '../utils/types';
import { MessageService } from './message.service';

@Resolver('Message')
@UseGuards(AuthenticatedGuard)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private channelService: ChannelService,
    private memberService: ChannelMemberService
  ) {}

  @Query()
  getMessagesByChannel(
    @Authenticated() user: UserData,
    @Args('channelId') channelId: string,
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ) {
    return this.messageService.fetchByChannel(
      channelId,
      user.sub,
      limit,
      nextToken
    );
  }

  @Mutation()
  createMessage(
    @Authenticated() user: UserData,
    @Args('input') input: NewMessage
  ) {
    return this.messageService.sendMessage({ ...input, profileId: user.sub });
  }

  @ResolveField('sender')
  sender(@Parent() message: Message) {
    return this.memberService
      .fetchMember(message.channelId, message.profileId)
      .elseNull();
  }

  @ResolveField('channel')
  channel(@Parent() message: Message) {
    return this.channelService.fetchChannel(message.channelId);
  }
}
