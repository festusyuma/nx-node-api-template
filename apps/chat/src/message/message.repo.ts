import { DynamoService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';
import { NewMessage } from '../utils/types';

@Injectable()
export class MessageRepo {
  private readonly tableName: string;

  constructor(private client: DynamoService, secrets: SecretsService) {
    this.tableName = secrets.get('MESSAGE_TABLE');
  }

  create(input: NewMessage) {
    return Optional.of(this.client.create(this.tableName, input));
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
