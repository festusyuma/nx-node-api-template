import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaEventSource from 'aws-cdk-lib/aws-lambda-event-sources';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as snsSubscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

import { secrets } from './secrets';

interface NotificationStackProps extends cdk.StackProps {
  dependencyLayer: lambda.LayerVersion;
  topic: sns.Topic;
}

export class NotificationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: NotificationStackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, 'NotificationHandler', {
      handler: 'main.sqsHandler',
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('dist/apps/notification-handler'),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
      layers: [props.dependencyLayer],
      environment: {
        MAIL_FROM: secrets.MAIL_FROM,
      },
    });

    handler.role?.attachInlinePolicy(
      new iam.Policy(this, 'SendMailPolicy', {
        statements: [
          new iam.PolicyStatement({
            actions: ['ses:SendEmail'],
            resources: ['*'],
          }),
        ],
      })
    );

    const notificationQueue = new sqs.Queue(this, 'NotificationQueue', {});

    const notificationSubscription = new snsSubscriptions.SqsSubscription(
      notificationQueue,
      {
        filterPolicyWithMessageBody: {
          pattern: sns.FilterOrPolicy.filter(
            sns.SubscriptionFilter.stringFilter({ allowlist: ['NOTIFICATION'] })
          ),
        },
        rawMessageDelivery: true,
      }
    );

    const handlerQueueSource = new lambdaEventSource.SqsEventSource(
      notificationQueue
    );

    handler.addEventSource(handlerQueueSource);
    props.topic.addSubscription(notificationSubscription);
  }
}
