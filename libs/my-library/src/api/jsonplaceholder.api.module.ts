import { Module } from '@nestjs/common';
import { JsonPlaceholderApi } from './jsonplaceholder.api.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [JsonPlaceholderApi],
  exports: [JsonPlaceholderApi],
})
export class JsonPlaceholderModule {}
