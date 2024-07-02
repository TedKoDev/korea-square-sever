import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { CreatePostWithUserIdDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostWithUserIdDto) {
    if (!createPostDto.title) {
      throw new BadRequestException('Title is required');
    }

    const { files, ...postData } = createPostDto;

    const post = await this.prisma.post.create({
      data: postData,
    });

    if (files && files.length > 0) {
      await this.prisma.file.createMany({
        data: files.map((url) => ({
          url,
          postId: post.id,
        })),
      });
    }

    return post;
  }

  async getPost(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { files: true }, // 파일 정보를 포함
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
