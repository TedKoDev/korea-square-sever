import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpStatus,
  NotFoundException,
  ParseIntPipe,
  Req,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PostService } from './post.service';

@Controller('v1/posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Post('addpost')
  async createPost(
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
    @Req() req,
  ) {
    console.log('createPostDto', createPostDto);

    // console.log('req', req); // 전체 req 객체 로그
    const userId = req.user?.id; // 토큰에서 추출된 userId
    if (!userId) {
      throw new NotFoundException('User not found');
    }
    const createdPost = await this.postsService.createPost({
      ...createPostDto,
      userId,
    });
    // console.log('createdPost', createdPost);
    return {
      message: 'Post created successfully',
      statusCode: HttpStatus.CREATED,
      data: createdPost,
    };
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postsService.getPost(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return {
      message: 'Post retrieved successfully',
      statusCode: HttpStatus.OK,
      data: post,
    };
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto,
  ) {
    updatePostDto.id = id;
    const updatedPost = await this.postsService.updatePost(updatePostDto);
    return {
      message: 'Post updated successfully',
      statusCode: HttpStatus.OK,
      data: updatedPost,
    };
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    const deletePostDto = new DeletePostDto();
    deletePostDto.id = id;
    await this.postsService.deletePost(deletePostDto);
    return {
      message: 'Post deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
