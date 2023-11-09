import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { Constants } from './constants';
import { layerVersionParam, secrets } from './secrets';

export class ChatStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
    const region = Stack.of(this).region;

    /** Get parameters from SSM. ****/

    const userPoolId = ssm.StringParameter.valueForStringParameter(
      this,
      `/${appName}/${Constants.UserPoolId}`
    );

    const topicArn = ssm.StringParameter.valueForStringParameter(
      this,
      `/${appName}/${Constants.AppTopicArn}`
    );

    const dependencyArn = ssm.StringParameter.valueForStringParameter(
      this,
      `/${appName}/${layerVersionParam}`
    );

    /******************************************/

    const appTopic = sns.Topic.fromTopicArn(this, 'AppTopic', topicArn);

    const dependencyLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'DependencyLayer',
      dependencyArn
    );

    const userPool = cognito.UserPool.fromUserPoolId(
      this,
      'AuthUserPool',
      userPoolId
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

    const chatFunctionUrl = chatFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    messageTable.grantFullAccess(chatFunction);
    profileTable.grantFullAccess(chatFunction);
    channelTable.grantFullAccess(chatFunction);
    channelMemberTable.grantFullAccess(chatFunction);

    new cdk.CfnOutput(this, 'Url', { value: chatFunctionUrl.url });

    /**********************************/
  }
}
