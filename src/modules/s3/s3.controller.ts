import { Controller, Get, Query } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('v1/s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get('presigned-url')
  async getPresignedUrl(@Query('contentType') contentType: string) {
    const presignedUrl = await this.s3Service.generatePresignedUrl(contentType);

    console.log('presignedUrl', presignedUrl);
    return { url: presignedUrl.url, key: presignedUrl.key };
  }
}
