import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as secretsManager from 'aws-cdk-lib/aws-secretsmanager';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

import { secrets } from './secrets';

interface AuthStackProps extends StackProps {
  dependencyLayer: string;
}

export class AuthStack extends Stack {
  public readonly userPool: cognito.UserPool;
  public readonly authFunction: lambda.Function;
  public readonly appClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props);

    const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
    const domain = secrets.DOMAIN;
    const secretName = `${appName}-auth-secrets`;

    const dependencyLayer = lambda.LayerVersion.fromLayerVersionArn(
      this,
      'DependencyLayer',
      ssm.StringParameter.fromStringParameterName(
        this,
        'DependencyLayerParam',
        props.dependencyLayer
      ).stringValue
    );

    const userPool = new cognito.UserPool(this, 'UserPool', {
      signInCaseSensitive: false,
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      mfa: cognito.Mfa.OPTIONAL,
      mfaSecondFactor: { sms: false, otp: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      email: cognito.UserPoolEmail.withCognito(`noreply@${domain}`),
      // email: cognito.UserPoolEmail.withSES({
      //   fromEmail: `noreply@${domain}`,
      //   sesVerifiedDomain: domain,
      // }), todo change to enable ses
      deletionProtection: true,
    });

    const appClient = new cognito.UserPoolClient(this, 'AuthorizerClient', {
      userPool,
      authFlows: { adminUserPassword: true, userPassword: true },
      disableOAuth: false,
      oAuth: {
        scopes: [cognito.OAuthScope.OPENID],
      },
      generateSecret: true,
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    const authFunction = new lambda.Function(this, 'AuthorizerFunction', {
      code: lambda.Code.fromAsset('dist/apps/auth'),
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'main.handler',
      memorySize: 512,
      layers: [dependencyLayer],
      timeout: Duration.seconds(30),
      environment: {
        USER_POOL_ID: userPool.userPoolId,
        USER_POOL_CLIENT_ID: appClient.userPoolClientId,
        APP_SECRETS: secretName,
      },
    });

    authFunction.grantInvoke(
      new iam.ServicePrincipal('apigateway.amazonaws.com')
    );

    const authSecrets = new secretsManager.Secret(this, 'AuthSecrets', {
      secretName,
      secretObjectValue: {
        USER_POOL_CLIENT_SECRET: appClient.userPoolClientSecret,
      },
    });

    authSecrets.grantRead(authFunction);

    this.userPool = userPool;
    this.authFunction = authFunction;
    this.appClient = appClient;
  }
}
