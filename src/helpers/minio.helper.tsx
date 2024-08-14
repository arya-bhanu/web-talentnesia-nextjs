import { z } from 'zod';
import { uuid } from 'uuidv4';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const minioAccessSchema = z.object({
  MINIO_ACCESS_KEY_ID: z
    .string()
    .min(1, { message: 'MINIO_ACCESS_KEY_ID cannot be empty' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_ACCESS_KEY_ID cannot contain only whitespace',
    }),
  MINIO_SECRET_ACCESS_KEY: z
    .string()
    .min(1, { message: 'MINIO_SECRET_ACCESS_KEY cannot be empty' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_SECRET_ACCESS_KEY cannot contain only whitespace',
    }),
  MINIO_BUCKET: z
    .string()
    .min(1, { message: 'MINIO_BUCKET cannot be empty' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_BUCKET cannot contain only whitespace',
    }),
  MINIO_DEFAULT_REGION: z
    .string()
    .min(1, { message: 'MINIO_DEFAULT_REGION cannot be empty' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_DEFAULT_REGION cannot contain only whitespace',
    }),
  MINIO_ENDPOINT: z
    .string()
    .min(1, { message: 'MINIO_ENDPOINT cannot be empty' })
    .url({ message: 'MINIO_ENDPOINT must be a valid URL' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_ENDPOINT cannot contain only whitespace',
    }),
  MINIO_URL: z
    .string()
    .min(1, { message: 'MINIO_URL cannot be empty' })
    .url({ message: 'MINIO_URL must be a valid URL' })
    .refine((value) => value.trim().length > 0, {
      message: 'MINIO_URL cannot contain only whitespace',
    }),
});

const prepareFileName = (file: File): string => {
  const now = new Date();
  const microtime = now.getTime() * 1000 + now.getMilliseconds();
  const extension = z.string().parse(file.name.split('.').pop());
  const fileName = microtime + '_' + uuid() + '.' + extension;

  return fileName;
};

const uploadMinio = async (
  file: File,
  group: string,
  directory: string,
): Promise<string> => {
  try {
    const minioConfig = minioAccessSchema.parse({
      MINIO_ACCESS_KEY_ID: process.env.MINIO_ACCESS_KEY_ID,
      MINIO_SECRET_ACCESS_KEY: process.env.MINIO_SECRET_ACCESS_KEY,
      MINIO_BUCKET: process.env.MINIO_BUCKET,
      MINIO_DEFAULT_REGION: process.env.MINIO_DEFAULT_REGION,
      MINIO_ENDPOINT: process.env.MINIO_ENDPOINT,
      MINIO_URL: process.env.MINIO_URL,
    });
    const s3Client = new S3Client({
      endpoint: minioConfig.MINIO_ENDPOINT,
      region: minioConfig.MINIO_DEFAULT_REGION,
      credentials: {
        accessKeyId: minioConfig.MINIO_ACCESS_KEY_ID,
        secretAccessKey: minioConfig.MINIO_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
    const now = new Date();
    const dateParsed = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const fileName = z.string().parse(prepareFileName(file));
    const filePath = `${group}/${directory}/${dateParsed}/${fileName}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: minioConfig.MINIO_BUCKET,
        Key: filePath,
        Body: file,
      }),
    );
    return dateParsed + '/' + fileName;
  } catch (error) {
    throw error;
  }
};

export { uploadMinio };
