import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseError, JsonPlaceholderApi, Content } from '@app/my-library';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostQueryParams } from './dto/post.query';
import { ContentRequest } from './dto/post.request';
import { LoggerService, handleRequest } from '../libs/my-library/src/index';
import { AppInterface } from './app.interface';

@Injectable()
export class AppService implements AppInterface{
  constructor(
    private readonly jsonPlaceholderApi: JsonPlaceholderApi,
    @InjectRepository(Content)
    private readonly postRepository: Repository<Content>,
    private readonly logger: LoggerService
  ) {}

  async fetchPostsFromApi(): Promise<Content[]> {
    return handleRequest(
      () => this.jsonPlaceholderApi.fetchAndProcessPosts(),
      'Fetch posts from API',
      this.logger
    );
  }

  async savePostsToDb(posts: Content[]): Promise<void> {
    await handleRequest(
      async () => {
        for (const post of posts) {
          const postEntity = this.postRepository.create(post);
          await this.postRepository.save(postEntity);
        }
      },
      'Save posts to DB',
      this.logger
    );
  }

  async getAllPostsFromDb(filter: PostQueryParams): Promise<{ data: Content[], count: number }> {
    return handleRequest(async () => {
      const { search, page = 1, length = 10 } = filter;
      const skip = (page - 1) * length;

      const query = this.postRepository.createQueryBuilder('content');

      if (search) {
        query.where(
          '(content.title ILIKE :search OR content.body ILIKE :search OR content.id::text ILIKE :search)',
          { search: `%${search}%` }
        );
      }

      const [data, count] = await query.skip(skip).take(length).getManyAndCount();

      return { data, count };
    }, 'Get all posts from DB', this.logger);
  }

  async getPostsFromDbById(id: number): Promise<Content> {
    return handleRequest(
      () => this.postRepository.findOneBy({ id }),
      `Get post from DB by ID ${id}`,
      this.logger
    );
  }

  async createPostToDb(post: ContentRequest): Promise<Content> {
    return handleRequest(
      async () => {
        const create = this.postRepository.create(post);
        return await this.postRepository.save(create);
      },
      'Create post in DB',
      this.logger
    );
  }

  async updatePostToDb(id: number, post: ContentRequest): Promise<Content> {
    return handleRequest(
      async () => {
        const found = await this.getPostsFromDbById(id);
        const updatedPost = this.postRepository.merge(found, post);
        return await this.postRepository.save(updatedPost);
      },
      `Update post in DB with ID ${id}`,
      this.logger
    );
  }

  async deletePostFromDb(id: number): Promise<void> {
    await handleRequest(
      async () => {
        const found = await this.getPostsFromDbById(id);
        await this.postRepository.remove(found);
      },
      `Delete post from DB with ID ${id}`,
      this.logger
    );
  }
}
