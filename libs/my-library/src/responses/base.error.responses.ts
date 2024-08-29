export class BaseError extends Error {
    public readonly statusCode: number;
    public readonly message: string;

    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;

      Object.setPrototypeOf(this, BaseError.prototype);

      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
