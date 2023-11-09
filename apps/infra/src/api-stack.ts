import * as gateway from '@aws-cdk/aws-apigatewayv2-alpha';
import * as gatewayIntegration from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { secrets } from './secrets';

interface App {
  function: lambda.Function;
  baseRoute: string;
}

interface ApiStackProps extends cdk.StackProps {
  apps: Record<string, App>;
}

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
    const appApi = new gateway.HttpApi(this, `${appName}-Api`, {});

    /**
     * Applications config
     * */

    for (const appId in props.apps) {
      const app = props.apps[appId];
      if (!app) continue;

      const integration = new gatewayIntegration.HttpLambdaIntegration(
        `${app}Integration`,
        app.function
      );

      appApi.addRoutes({
        integration: integration,
        path: `/${app.baseRoute}/{proxy+}`,
      });
    }

    /*************************/

    new cdk.CfnOutput(this, 'Url', { value: appApi.apiEndpoint });
  }
}
