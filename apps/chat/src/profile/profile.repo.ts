import { DynamoService } from '@backend-template/database';
import { Optional } from '@backend-template/helpers';
import { WithId } from '@backend-template/types';
import { getPromiseAttribute } from '@backend-template/utils';
import { Injectable } from '@nestjs/common';

import { SecretsService } from '../secrets/secrets.service';
import { NewProfile } from '../utils/types';

@Injectable()
export class ProfileRepo {
  private readonly tableName: string;

  constructor(private client: DynamoService, secrets: SecretsService) {
    this.tableName = secrets.get('PROFILE_TABLE');
  }

  create(input: WithId<NewProfile>) {
    return this.client.put({
      TableName: this.tableName,
      Item: input,
    });
  }

  findById(id: string) {
    return Optional.of(
      getPromiseAttribute(
        this.client.get({
          TableName: this.tableName,
          Key: { id },
        }),
        'Item'
      )
    );
  }
}
