import { HttpStatus } from '@nestjs/common';

export class BaseResponses<T> {
  statusCode: HttpStatus;
  message: string;
  data: T;

  constructor(statusCode: HttpStatus = HttpStatus.OK, message: string = 'Success', data: T = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
