import { z } from 'zod';

export const UploadFileSchema = z.object({
  action: z.literal('upload'),
  fileName: z.string(),
  secure: z.boolean().default(false),
  fileType: z.union([
    z.object({ type: z.literal('documents'), extension: z.string() }),
    z.object({
      type: z.literal('audio'),
      extension: z.enum(['aac', 'mp3', 'ogg', 'wav', 'm4a']),
    }),
    z.object({
      type: z.literal('image'),
      extension: z.enum(['jpeg', 'jpg', 'png', 'gif']),
    }),
    z.object({
      type: z.literal('video'),
      extension: z.enum(['']),
      transcode: z.boolean().default(false),
    }),
  ]),
});

export const GenerateSignedSchema = z.object({
  action: z.enum(['generateSignedUrl', 'generateSignedCookie']),
  url: z.string(),
});

export const FileManagerSchema = z.union([
  UploadFileSchema,
  GenerateSignedSchema,
]);

export type UploadFileData = z.infer<typeof UploadFileSchema>;
export type GenerateSignedUrlData = z.infer<typeof GenerateSignedSchema>;
export type FileManagerData = z.infer<typeof FileManagerSchema>;