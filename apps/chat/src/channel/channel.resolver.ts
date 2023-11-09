import {
  Authenticated,
  AuthenticatedGuard,
} from '@backend-template/graphql-server';
import { UserData } from '@backend-template/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { NewChannel } from '../utils/types';
import { ChannelService } from './channel.service';

@Resolver('Channel')
@UseGuards(AuthenticatedGuard)
export class ChannelResolver {
  constructor(private channelService: ChannelService) {}

  @Query()
  async getChannel(@Args('id') id: string) {
    return this.channelService.fetchChannel(id);
  }

  @Mutation()
  async createChannel(
    @Authenticated() user: UserData,
    @Args('input') input: NewChannel
  ) {
    return this.channelService.createChannel(input);
  }
}
