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
import { ProfileService } from '../profile/profile.service';
import { ChannelMember, NewChannelMember } from '../utils/types';
import { ChannelMemberService } from './channel-member.service';

@Resolver('ChannelMember')
@UseGuards(AuthenticatedGuard)
export class ChannelMemberResolver {
  constructor(
    private memberService: ChannelMemberService,
    private channelService: ChannelService,
    private profileService: ProfileService
  ) {}

  @Mutation()
  createChannelMember(
    @Authenticated() user: UserData,
    @Args('input') input: NewChannelMember
  ) {
    return this.memberService.create({ ...input, profileId: user.sub });
  }

  @Query()
  getChannelsByProfile(
    @Authenticated() user: UserData,
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ) {
    return this.memberService.fetchAllByProfile(user.sub, limit, nextToken);
  }

  @Query()
  getMembersByChannel(
    @Args('channelId') channelId: string,
    @Args('limit') limit?: number,
    @Args('nextToken') nextToken?: string
  ) {
    return this.memberService.fetchAllByChannel(channelId, limit, nextToken);
  }

  @ResolveField('channel')
  channel(@Parent() member: ChannelMember) {
    return this.channelService.fetchChannel(member.channelId);
  }

  @ResolveField('profile')
  profile(@Parent() member: ChannelMember) {
    return this.profileService.fetchProfile(member.profileId);
  }
}
