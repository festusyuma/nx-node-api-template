import { HTTPMethod } from './controller';

export type LambdaEvent =
  | { Records: LambdaEventRecord[] }
  | { routeKey: string }
  | HttpEvent;

export interface HttpEvent {
  headers: Record<string, string>;
  requestContext: GatewayRequestContext;
}

export type LambdaEventRecord =
  | ({ eventSource: LambdaEventSource.S3 } & S3EventBody)
  | ({ eventSource: LambdaEventSource.SQS } & SQSEventBody);

export interface GatewayRequestContext {
  http: GatewayHttpData;
  stage: string;
}

export interface GatewayHttpData {
  method: HTTPMethod;
  path: string;
}

export enum LambdaEventSource {
  S3 = 'aws:s3',
  SQS = 'aws:sqs',
}

export interface SQSEventBody {
  messageId: string;
  body: string;
}

export interface S3EventBody {
  object: S3Object;
  bucket: S3Bucket;
}

export interface S3Object {
  key: string;
  size: number;
}

export interface S3Bucket {
  arn: string;
  name: string;
}
