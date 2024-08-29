import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostQueryParams } from './dto/post.query';
import { DatatableResponses, Content, BaseResponses } from '@app/my-library';
import { ContentRequest } from './dto/post.request';

@ApiTags('Posts')
@Controller('posts')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('fetch-from-api')
    async fetchFromApi() {
        return await this.appService.fetchPostsFromApi();
    }

    @Post('save-to-db')
    async saveToDb() {
        const posts = await this.appService.fetchPostsFromApi();
        await this.appService.savePostsToDb(posts);
        return new BaseResponses<Content>(HttpStatus.OK, 'Data saved successfully', null);
    }

    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'length', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @Get('get-from-db')
    async getFromDb(@Query() filter: PostQueryParams) {
        const { data, count } = await this.appService.getAllPostsFromDb(filter);
        return new DatatableResponses<Content>(data, count);
    }

    @Post('create-to-db')
    async createPostToDb(@Body() post: ContentRequest) {
        const createdPost = await this.appService.createPostToDb(post);
        return new BaseResponses<Content>(HttpStatus.OK, 'Data saved successfully', createdPost);
    }

    @Patch('update-to-db/:id')
    async updatePostToDb(
        @Param('id') id: number,
        @Body() post: ContentRequest
    ) {
        const updatedPost = await this.appService.updatePostToDb(id, post);
        return new BaseResponses<Content>(HttpStatus.OK, 'Data updated successfully', updatedPost);
    }

    @Delete('delete-from-db/:id')
    async deletePostFromDb(@Param('id') id: number) {
        const deletedPost = await this.appService.getPostsFromDbById(id);
        await this.appService.deletePostFromDb(id);
        return new BaseResponses<Content>(HttpStatus.OK, 'Data deleted successfully', deletedPost);
    }
}
