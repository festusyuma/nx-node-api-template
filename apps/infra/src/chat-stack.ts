import * as cdk from 'aws-cdk-lib';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

interface ChatStackProps extends cdk.StackProps {
  dependencyLayer: string;
}

export class ChatStack extends cdk.Stack {
  public readonly chatFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: ChatStackProps) {
    super(scope, id, props);

    const dependencyLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'DependencyLayer',
      ssm.StringParameter.fromStringParameterName(
        this,
        'DependencyLayerParam',
        props.dependencyLayer
      ).stringValue
    );

    /********** Datasources  ***********/

    const channelTable = new dynamoDb.TableV2(this, 'ChannelTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
    });

    const profileTable = new dynamoDb.TableV2(this, 'ProfileTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
    });

    const channelMemberTable = new dynamoDb.TableV2(
      this,
      'ChannelMemberTable',
      {
        partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
        globalSecondaryIndexes: [
          {
            partitionKey: {
              name: 'channelId',
              type: dynamoDb.AttributeType.STRING,
            },
            indexName: 'byChannel',
          },
          {
            partitionKey: {
              name: 'profileId',
              type: dynamoDb.AttributeType.STRING,
            },
            indexName: 'byProfile',
          },
        ],
      }
    );

    const messageTable = new dynamoDb.TableV2(this, 'MessageTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
      globalSecondaryIndexes: [
        {
          indexName: 'byChannel',
          partitionKey: {
            name: 'channelId',
            type: dynamoDb.AttributeType.STRING,
          },
        },
      ],
    });

    /*********************/

    /**
     * Chat application.
     * */

    const chatFunction = new lambda.Function(this, 'AppFunction', {
      code: lambda.Code.fromAsset('dist/apps/chat'),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      layers: [dependencyLayer],
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      environment: {
        CHANNEL_TABLE: channelTable.tableName,
        PROFILE_TABLE: profileTable.tableName,
        MESSAGE_TABLE: messageTable.tableName,
        CHANNEL_MEMBER_TABLE: channelMemberTable.tableName,
      },
    });

    messageTable.grantFullAccess(chatFunction);
    profileTable.grantFullAccess(chatFunction);
    channelTable.grantFullAccess(chatFunction);
    channelMemberTable.grantFullAccess(chatFunction);

    /**********************************/

    this.chatFunction = chatFunction;
  }
}
