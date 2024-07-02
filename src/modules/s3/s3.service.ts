import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async generatePresignedUrl(
    contentType: string,
  ): Promise<{ url: string; key: string }> {
    const fileExtension = contentType.split('/')[1]; // MIME 타입에서 확장자를 추출
    const fileKey = `${uuidv4()}.${fileExtension}`; // 파일 키를 생성
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
    };

    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 }); // 1시간 유효 기간

    return { url, key: fileKey };
  }
}
