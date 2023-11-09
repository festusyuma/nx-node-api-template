import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

interface AppStackProps extends cdk.StackProps {
  dependencyLayer: lambda.LayerVersion;
}

export class ServerStack extends cdk.Stack {
  public readonly appFunction: lambda.Function;

  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'AppTopic');

    const appFunction = new lambda.Function(this, 'AppFunction', {
      code: lambda.Code.fromAsset('dist/apps/nest-template'),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      layers: [props.dependencyLayer],
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
    });

    appFunction.grantInvoke(
      new iam.ServicePrincipal('apigateway.amazonaws.com')
    );

    this.appFunction = appFunction;
  }
}
