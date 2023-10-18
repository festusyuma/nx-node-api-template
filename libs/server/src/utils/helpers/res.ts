import {
  noPermissionError,
  successful,
  unauthorizedError,
  unknownServerError,
} from '../constants';
import { HttpStatusCode, IRes, IResData } from '../types';

export class Res<T> extends Error implements IRes<T> {
  message: string;
  success: boolean;
  status: HttpStatusCode;
  data: T | undefined;

  constructor(
    status: HttpStatusCode = HttpStatusCode.SUCCESS,
    message = '',
    success = false,
    data?: T
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.data = data;
    this.success = success;
  }

  static throw() {
    return Res.serverError();
  }

  static success<T>(data?: T, message = successful): Res<T> {
    const res = new Res<T>();

    res.success = true;
    res.data = data;
    res.message = message;

    return res;
  }

  static failed<T>(message: string, data?: T): Res<T> {
    const res = new Res<T>();

    res.message = message;
    res.data = data;

    return res;
  }

  static badRequest<T>(message: string): Res<T> {
    const res = new Res<T>();

    res.status = HttpStatusCode.BAD_REQUEST;
    res.message = message;

    return res;
  }

  static unauthorized<T>(message = unauthorizedError): Res<T> {
    const res = new Res<T>();

    res.status = HttpStatusCode.UNAUTHORIZED;
    res.message = message;

    return res;
  }

  static forbidden<T>(message = noPermissionError): Res<T> {
    const res = new Res<T>();

    res.status = HttpStatusCode.FORBIDDEN;
    res.message = message;

    return res;
  }

  static serverError<T>(message = unknownServerError): Res<T> {
    const res = new Res<T>();

    res.status = HttpStatusCode.SERVER_ERROR;
    res.message = message;

    return res;
  }

  getData(): IResData<T> {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
    };
  }
}
