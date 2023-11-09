import { DynamoService } from '@backend-template/database';
import { getPromiseAttribute, Optional } from '@backend-template/helpers';
import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';
import { NewChannel } from '../utils/types';

@Injectable()
export class ChannelRepo {
  private readonly tableName: string;

  constructor(private client: DynamoService, secrets: SecretsService) {
    this.tableName = secrets.get('CHANNEL_TABLE');
  }

  create(input: NewChannel) {
    return this.client.create(this.tableName, input);
  }

  findById(id: string) {
    return Optional.of(
      getPromiseAttribute(
        this.client.get({ TableName: this.tableName, Key: { id } }),
        'Item'
      )
    );
  }
}
