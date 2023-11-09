import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { WithId } from '@backend-template/types';
import { autoId } from '@backend-template/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoService extends DynamoDBDocument {
  constructor(region?: string) {
    super(DynamoDBDocument.from(new DynamoDBClient({ region })));
  }

  async queryBy(
    tableName: string,
    indexName: string,
    field: string,
    value: unknown,
    limit?: number,
    nextToken?: string
  ) {
    const res = await this.query({
      TableName: tableName,
      IndexName: indexName,
      KeyConditions: {
        [field]: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [value],
        },
      },
      Limit: limit,
      ExclusiveStartKey: nextToken
        ? JSON.parse(Buffer.from(nextToken, 'base64').toString())
        : undefined,
    });

    return {
      items: res.Items,
      nextToken: res.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(res.LastEvaluatedKey)).toString('base64')
        : undefined,
    };
  }

  async queryAll(tableName: string, limit?: number, nextToken?: string) {
    const res = await this.query({
      TableName: tableName,
      Limit: limit,
      ExclusiveStartKey: nextToken
        ? JSON.parse(Buffer.from(nextToken, 'base64').toString())
        : undefined,
    });

    return {
      items: res.Items,
      nextToken: res.LastEvaluatedKey
        ? Buffer.from(JSON.stringify(res.LastEvaluatedKey)).toString('base64')
        : undefined,
    };
  }

  async create<T extends object>(
    tableName: string,
    input: T
  ): Promise<WithId<T>> {
    const item = {
      ...input,
      id: 'id' in input ? (input.id as string) : autoId(),
    };

    await this.put({
      TableName: tableName,
      Item: item,
    });

    return item;
  }
}
