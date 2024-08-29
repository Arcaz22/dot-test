import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';
import { handleRequest } from '../utils/request-handler';

@Injectable()
export class PostService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private readonly logger: LoggerService) {}

  async getPosts() {
    return handleRequest(
      () => axios.get(`${this.baseUrl}/posts`),
      'Fetch posts',
      this.logger
    );
  }
}
