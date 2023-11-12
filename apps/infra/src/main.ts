#!/usr/bin/env node
import 'source-map-support/register';
import 'dotenv/config.js';

import * as cdk from 'aws-cdk-lib';
import * as process from 'process';

import { ApiStack } from './api-stack';
import { AuthStack } from './auth-stack';
// import { ChatStack } from './chat-stack';
import { DependencyStack } from './dependency-stack';
// import { FileManagerStack } from './file-manager-stack';
// import { NotificationStack } from './notification-stack';
import { getSecrets, secrets } from './secrets';
// import { ServerStack } from './server-stack';
// import { SharedStack } from './shared-stack';

getSecrets().then(() => {
  const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
  const app = new cdk.App();
  const env: cdk.Environment = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  };

  const dependency = new DependencyStack(app, 'dependency', {
    stackName: `${appName}-dependency`,
    env,
  });

  // const shared = new SharedStack(app, 'shared', {
  //   stackName: `${appName}-shared`,
  //   env,
  // });

  // new NotificationStack(app, 'notification', {
  //   stackName: `${appName}-notification`,
  //   env,
  //   dependencyLayer: dependency.layerArn,
  //   topic: shared.topic,
  // });

  const auth = new AuthStack(app, 'auth', {
    stackName: `${appName}-auth`,
    env,
    dependencyLayer: dependency.layerArn,
  });

  // const chat = new ChatStack(app, 'chat', {
  //   stackName: `${appName}-chat`,
  //   env,
  //   dependencyLayer: dependency.layerArn,
  // });
  //
  // const server = new ServerStack(app, 'app', {
  //   stackName: `${appName}-app`,
  //   env,
  //   dependencyLayer: dependency.layerArn,
  // });
  //
  // const file = new FileManagerStack(app, 'filemanager', {
  //   stackName: `${appName}-file`,
  //   env,
  //   dependencyLayer: dependency.layerArn,
  // });

  new ApiStack(app, 'api', {
    stackName: `${appName}-api`,
    env,
    apps: {
      auth: { baseRoute: 'auth', function: auth.authFunction },
      // server: { baseRoute: 'v1', function: server.appFunction },
      // file: { baseRoute: 'file', function: file.fileFunction },
      // chat: { baseRoute: 'chat', function: chat.chatFunction },
    },
  });
});
