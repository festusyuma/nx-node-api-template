import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export class BaseStack extends cdk.Stack {
  public readonly topic: sns.Topic;
  public readonly dependencyLayer: lambda.LayerVersion;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.topic = new sns.Topic(this, 'AppTopic');

    this.dependencyLayer = new lambda.LayerVersion(this, 'DependencyLayer', {
      code: lambda.Code.fromAsset('dist/dependency'),
      removalPolicy: RemovalPolicy.RETAIN,
    });
  }
}
