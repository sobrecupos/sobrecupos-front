import { RestClient } from "@marketplace/libs/rest-client";
import { PutBlobResult } from "@vercel/blob";

const ONE_MB_IN_BYTES = 1_048_576;

export class FilesClient extends RestClient {
  readonly maxFileSizeInMB = 5;
  readonly maxFileSize = this.maxFileSizeInMB * ONE_MB_IN_BYTES;

  async upload(file: File) {
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const { url, fields } = await this.get("/api/files/url", {
      params: { file: filename, fileType, prefixHash: true },
    });

    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    await this.post(url, { body: formData });

    return `${url}${fields.key}`;
  }

  async uploadToVercelBlob(file: File) {
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = (await response.json()) as PutBlobResult;
    return `${newBlob.url}`;
  }
}

export const filesClient = new FilesClient();
