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
  | ({ eventSource: 'aws:s3' } & S3EventBody)
  | ({ eventSource: 'aws:sqs' } & SQSEventBody);

export interface GatewayRequestContext {
  http: GatewayHttpData;
  stage: string;
}

export interface GatewayHttpData {
  method: HTTPMethod;
  path: string;
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
