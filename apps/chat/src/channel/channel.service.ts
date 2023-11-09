import { Injectable } from '@nestjs/common';

import { NewChannel } from '../utils/types';
import { ChannelRepo } from './channel.repo';

@Injectable()
export class ChannelService {
  constructor(private channelRepo: ChannelRepo) {}

  async createChannel(data: NewChannel) {
    return await this.channelRepo.create(data);
  }

  async fetchChannel(id: string) {
    return await this.channelRepo.findById(id).elseNull();
  }
}
