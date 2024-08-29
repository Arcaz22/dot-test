import { HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';
import { BaseError } from '@app/my-library';

export async function handleRequest<T>(
  request: () => Promise<any>,
  action: string,
  logger: LoggerService
): Promise<T> {
  try {
    const response = await request();
    logger.log(`${action} succeeded`);
    return response;
  } catch (error) {
    logger.error(`${action} failed`, error.message);
    throw new BaseError(
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      error.response?.data?.message || 'An error occurred while processing your request'
    );
  }
}
