import axios from 'axios';
import { Injectable, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';
import { BaseError } from '@app/my-library';

@Injectable()
export class PostService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly logger: LoggerService) {}

  async getPosts() {
    try {
      const response = await axios.get(`${this.baseUrl}/posts`);
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching posts', error.stack);
      throw new BaseError(
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        error.response?.data?.message || 'An error occurred while fetching posts'
      );
    }
  }
}
