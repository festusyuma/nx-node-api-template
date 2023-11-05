import { Stack, StackProps } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { Constants } from './constants';
import { secrets } from './secrets';

export class ChatStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = `${secrets.APP_NAME}-${secrets.ENV}`;

    /** Get parameters from SSM. ****/

    const userPoolId = ssm.StringParameter.valueForStringParameter(
      this,
      `/${appName}/${Constants.UserPoolId}`
    );

    /******************************************/

    const userPool = cognito.UserPool.fromUserPoolId(
      this,
      'AuthUserPool',
      userPoolId
    );

    const api = new appsync.GraphqlApi(this, 'ChatApi', {
      name: `${appName}-chatApi`,
      definition: appsync.Definition.fromFile(
        `dist/apps/chat/src/schema/schema.graphql`
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
        excludeVerboseContent: false,
        retention: RetentionDays.FIVE_DAYS,
      },
    });

    /********** Datasources  ***********/

    const channelTable = new dynamoDb.TableV2(this, 'ChannelTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
    });

    const channelDataSource = api.addDynamoDbDataSource(
      'ChannelDataSource',
      channelTable
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

    const messageDataSource = api.addDynamoDbDataSource(
      'MessageDataSource',
      messageTable
    );

    const profileTable = new dynamoDb.TableV2(this, 'ProfileTable', {
      partitionKey: { name: 'id', type: dynamoDb.AttributeType.STRING },
    });

    const profileDataSource = api.addDynamoDbDataSource(
      'ProfileDataSource',
      profileTable
    );

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

    const channelMemberDataSource = api.addDynamoDbDataSource(
      'ChannelMemberSource',
      channelMemberTable
    );

    /*******************************/

    /*************** Resolvers **************/

    channelDataSource.createResolver('CreateChannelResolver', {
      typeName: 'Mutation',
      fieldName: 'createChannel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/create-type.resolver.js'
      ),
    });

    profileDataSource.createResolver('CreateProfileResolver', {
      typeName: 'Mutation',
      fieldName: 'createProfile',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/create-type.resolver.js'
      ),
    });

    messageDataSource.createResolver('CreateMessageResolver', {
      typeName: 'Mutation',
      fieldName: 'createMessage',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/create-type.resolver.js'
      ),
    });

    channelMemberDataSource.createResolver('CreateChannelMemberResolver', {
      typeName: 'Mutation',
      fieldName: 'createChannelMember',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/create-type.resolver.js'
      ),
    });

    channelDataSource.createResolver('GetChannelResolver', {
      typeName: 'Query',
      fieldName: 'getChannel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/get-type.resolver.js'
      ),
    });

    channelMemberDataSource.createResolver('GetChannelMembersResolver', {
      typeName: 'Query',
      fieldName: 'getMembersByChannel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/get-channel-members.resolver.js'
      ),
    });

    channelMemberDataSource.createResolver('GetProfileChannelsResolver', {
      typeName: 'Query',
      fieldName: 'getChannelsByProfile',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/get-profile-channels.resolver.js'
      ),
    });

    messageDataSource.createResolver('GetChannelMessagesResolver', {
      typeName: 'Query',
      fieldName: 'getMessagesByChannel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/get-channel-messages.resolver.js'
      ),
    });

    channelDataSource.createResolver('MessageChannelResolver', {
      typeName: 'Message',
      fieldName: 'channel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/message-channel.resolver.js'
      ),
    });

    channelMemberDataSource.createResolver('MessageSenderResolver', {
      typeName: 'Message',
      fieldName: 'sender',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/message-sender.resolver.js'
      ),
    });

    profileDataSource.createResolver('MemberProfileResolver', {
      typeName: 'ChannelMember',
      fieldName: 'profile',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/member-profile.resolver.js'
      ),
    });

    channelDataSource.createResolver('MemberChannelResolver', {
      typeName: 'ChannelMember',
      fieldName: 'channel',
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      code: appsync.Code.fromAsset(
        'dist/apps/chat/resolvers/member-channel.resolver.js'
      ),
    });

    /**********************************/
  }
}
