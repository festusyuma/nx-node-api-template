#!/usr/bin/env node
import 'source-map-support/register';
import 'dotenv/config.js';

import * as cdk from 'aws-cdk-lib';
import * as process from 'process';

import { ApiStack } from './api-stack';
import { AuthStack } from './auth-stack';
import { BaseStack } from './base-stack';
import { ChatStack } from './chat-stack';
// import { FileManagerStack } from './file-manager-stack';
import { NotificationStack } from './notification-stack';
import { getSecrets, secrets } from './secrets';
// import { ServerStack } from './server-stack';

getSecrets().then(() => {
  const appName = `${secrets.APP_NAME}-${secrets.ENV}`;
  const app = new cdk.App();
  const env: cdk.Environment = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  };

  const base = new BaseStack(app, 'base', {
    stackName: `${appName}-base`,
    env,
  });

  new NotificationStack(app, 'notification', {
    stackName: `${appName}-notification`,
    env,
    dependencyLayer: base.dependencyLayer,
    topic: base.topic,
  });

  const auth = new AuthStack(app, 'auth', {
    stackName: `${appName}-auth`,
    env,
    dependencyLayer: base.dependencyLayer,
  });

  const chat = new ChatStack(app, 'chat', {
    stackName: `${appName}-chat`,
    env,
    dependencyLayer: base.dependencyLayer,
  });

  // const server = new ServerStack(app, 'app', {
  //   stackName: `${appName}-app`,
  //   env,
  //   dependencyLayer: base.dependencyLayer,
  // });

  // const file = new FileManagerStack(app, 'filemanager', {
  //   stackName: `${appName}-file`,
  //   env,
  //   dependencyLayer: base.dependencyLayer,
  // });

  new ApiStack(app, 'api', {
    stackName: `${appName}-api`,
    env,
    apps: {
      // server: { baseRoute: 'v1', function: server.appFunction },
      // file: { baseRoute: 'file', function: file.fileFunction },
      auth: { baseRoute: 'auth', function: auth.authFunction },
      chat: { baseRoute: 'chat', function: chat.chatFunction },
    },
  });
});
