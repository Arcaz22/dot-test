import { Injectable } from '@nestjs/common';
import { PostService } from '../post/post.service';

@Injectable()
export class JsonPlaceholderApi {
  constructor(private readonly postService: PostService) {}

  async fetchAndProcessPosts() {
    const posts = await this.postService.getPosts();
    return posts;
  }
}
