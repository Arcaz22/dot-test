import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { LoggingModule } from '../logging/logger.module';

@Module({
    imports: [LoggingModule],
    providers: [PostService],
    exports: [PostService],
})
export class PostModule {}
