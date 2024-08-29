// interfaces/app.interface.ts
import { Content } from '@app/my-library';  // Import sesuai lokasi yang benar
import { PostQueryParams } from './dto/post.query';
import { ContentRequest } from './dto/post.request';

export interface AppInterface {
  fetchPostsFromApi(): Promise<Content[]>;
  savePostsToDb(posts: Content[]): Promise<void>;
  getAllPostsFromDb(filter: PostQueryParams): Promise<{ data: Content[], count: number }>;
  getPostsFromDbById(id: number): Promise<Content>;
  createPostToDb(post: ContentRequest): Promise<Content>;
  updatePostToDb(id: number, post: ContentRequest): Promise<Content>;
  deletePostFromDb(id: number): Promise<void>;
}
