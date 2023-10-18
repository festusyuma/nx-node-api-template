import {RawCreateParams, ZodSchema} from "zod";

export interface ValidationRequest<T> {
  schema: ZodSchema<T>;
  options?: RawCreateParams;
}

export interface CacheOptions {
  key?: string;
  expiration?: CacheExpiration;
}

export enum CacheExpiration {
  NONE = 0,
  HALF_HOUR = 1800,
  HOUR = 3600,
  HALF_DAY = 43200,
  DAY = 86400,
  HALF_WEEK = 302400,
  WEEK = 604800,

}

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export enum HttpStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}
