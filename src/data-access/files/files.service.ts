import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { MAX_FILE_SIZE } from "./files.config";

export class FilesService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({});
  }

  createPresignedPost({
    file,
    fileType,
    prefixHash,
  }: {
    file: string;
    fileType: string;
    prefixHash?: boolean;
  }) {
    if (!process.env.AWS_BUCKET_NAME) {
      throw new Error("Bucket name not provided");
    }

    const filename = prefixHash ? this.hash(file) : file;

    return createPresignedPost(this.s3Client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Fields: {
        key: filename,
        "Content-Type": fileType,
        "Content-Disposition": "inline",
      },
      Expires: 60,
      Conditions: [["content-length-range", 0, MAX_FILE_SIZE]],
    });
  }

  private hash(name: string) {
    return `${Date.now()}-${name}`;
  }
}

export const filesService = new FilesService();
