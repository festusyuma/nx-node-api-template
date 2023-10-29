import {
  awsBootstrap,
  awsService,
  AwsTransporter,
} from '@backend-template/microservice';
import { httpBootstrap } from '@backend-template/server';
import awsLambdaFastify from '@fastify/aws-lambda';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { APIGatewayProxyEvent, Handler, SNSEvent, SQSEvent } from 'aws-lambda';
import { firstValueFrom, ReplaySubject } from 'rxjs';

import { AppModule } from './app.module';

const httpSubject = new ReplaySubject<NestFastifyApplication>();
const microserviceSubject = new ReplaySubject<AwsTransporter>();

httpBootstrap(AppModule, 'template').then((transporter) =>
  httpSubject.next(transporter)
);

awsBootstrap(AppModule).then((transporter) =>
  microserviceSubject.next(transporter)
);

export const handler: Handler = async (
  event: APIGatewayProxyEvent | SQSEvent | SNSEvent,
  context
) => {
  if ('httpMethod' in event) {
    const transporter = await firstValueFrom(httpSubject);
    const fastifyApp = transporter.getHttpAdapter().getInstance();
    return awsLambdaFastify(fastifyApp, {})(event, context);
  } else {
    const transporter = await firstValueFrom(microserviceSubject);
    await awsService(event, context, transporter);
  }
};
