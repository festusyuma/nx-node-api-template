import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { secrets } from './secrets';

export class DependencyStack extends cdk.Stack {
  public readonly layerArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
    this.layerArn = `/${appName}/LayerVersionArn`;

    const dependencyLayer = new lambda.LayerVersion(this, 'DependencyLayer', {
      code: lambda.Code.fromAsset('dist/dependency'),
      layerVersionName: `${appName}-dependencies`,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    new ssm.StringParameter(this, 'DependencyLayerArn', {
      stringValue: dependencyLayer.layerVersionArn,
      parameterName: this.layerArn,
    });
  }
}
