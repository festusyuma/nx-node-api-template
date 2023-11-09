import { CustomRes } from '@backend-template/http';
import { Injectable } from '@nestjs/common';

import { ChannelRepo } from '../channel/channel.repo';
import { ProfileRepo } from '../profile/profile.repo';
import { NewChannelMember } from '../utils/types';
import { ChannelMemberRepo } from './channel-member.repo';

@Injectable()
export class ChannelMemberService {
  constructor(
    private memberRepo: ChannelMemberRepo,
    private profileRepo: ProfileRepo,
    private channelRepo: ChannelRepo
  ) {}

  async create(input: NewChannelMember & { profileId: string }) {
    await this.profileRepo.findById(input.profileId).elseThrow();
    await this.channelRepo.findById(input.channelId).elseThrow();

    const id = Buffer.from(`${input.channelId}_${input.profileId}`).toString(
      'base64'
    );

    const inChannel = await this.memberRepo.findById(id).elseNull();
    if (inChannel) throw CustomRes.badRequest('member already in channel');

    return await this.memberRepo.create({ ...input, id });
  }

  fetchMember(channelId: string, profileId: string) {
    return this.memberRepo.findById(
      Buffer.from(`${channelId}_${profileId}`).toString('base64')
    );
  }

  async fetchAllByProfile(
    profileId: string,
    limit?: number,
    nextToken?: string
  ) {
    const data = await this.memberRepo
      .findAllByProfile(profileId, limit, nextToken)
      .elseThrow();

    return { channels: data.items, nextToken: data.nextToken };
  }

  async fetchAllByChannel(
    channelId: string,
    limit?: number,
    nextToken?: string
  ) {
    const data = await this.memberRepo
      .findAllByChannel(channelId, limit, nextToken)
      .elseThrow();

    return { members: data.items, nextToken: data.nextToken };
  }
}
