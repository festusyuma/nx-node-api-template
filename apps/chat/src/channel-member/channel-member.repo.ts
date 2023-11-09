import { DynamoService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { WithId } from '@backend-template/types';
import { getPromiseAttribute } from '@backend-template/utils';
import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';
import { NewChannelMember } from '../utils/types';

@Injectable()
export class ChannelMemberRepo {
  private readonly tableName: string;

  constructor(private client: DynamoService, secrets: SecretsService) {
    this.tableName = secrets.get('CHANNEL_MEMBER_TABLE');
  }

  findById(id: string) {
    return Optional.of(
      getPromiseAttribute(
        this.client.get({ TableName: this.tableName, Key: { id } }),
        'Item'
      )
    );
  }

  create(input: WithId<NewChannelMember & { profileId: string }>) {
    return this.client.create(this.tableName, input);
  }

  findAllByProfile(profileId: string, limit?: number, nextToken?: string) {
    return Optional.of(
      this.client.queryBy(
        this.tableName,
        'byProfile',
        'profileId',
        profileId,
        limit,
        nextToken
      )
    );
  }

  findAllByChannel(channelId: string, limit?: number, nextToken?: string) {
    return Optional.of(
      this.client.queryBy(
        this.tableName,
        'byChannel',
        'channelId',
        channelId,
        limit,
        nextToken
      )
    );
  }
}
