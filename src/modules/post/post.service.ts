import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    if (!createPostDto.title) {
      throw new BadRequestException('Title is required');
    }
    return await this.prisma.post.create({
      data: createPostDto,
    });
  }

  async getPost(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async updatePost(updatePostDto: UpdatePostDto) {
    const { id, ...updateData } = updatePostDto;

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return await this.prisma.post.update({
      where: { id },
      data: updateData,
    });
  }

  async deletePost(deletePostDto: DeletePostDto) {
    const { id } = deletePostDto;

    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.prisma.post.delete({
      where: { id },
    });
  }
}
