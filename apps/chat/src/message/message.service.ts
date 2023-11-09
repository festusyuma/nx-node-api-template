import { CustomRes } from '@backend-template/http';
import { Injectable } from '@nestjs/common';

import { ChannelMemberService } from '../channel-member/channel-member.service';
import { NewMessage } from '../utils/types';
import { MessageRepo } from './message.repo';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessageRepo,
    private memberService: ChannelMemberService
  ) {}

  async sendMessage(input: NewMessage & { profileId: string }) {
    await this.memberService
      .fetchMember(input.channelId, input.profileId)
      .elseThrow(CustomRes.forbidden('you are not in this channel'));

    return this.messageRepo.create(input).elseThrow();
  }

  async fetchByChannel(
    channelId: string,
    profileId?: string,
    limit?: number,
    nextToken?: string
  ) {
    if (profileId) {
      await this.memberService
        .fetchMember(channelId, profileId)
        .elseThrow(CustomRes.forbidden('you are not in this channel'));
    }

    const data = await this.messageRepo
      .findAllByChannel(channelId, limit, nextToken)
      .elseThrow();

    return { messages: data.items, nextToken: data.nextToken };
  }
}
