import { z } from 'zod';

export const filesSchema = z.object({
  files: z
    .array(z.any())
    .nullable()
    .refine((files) => files && files.length > 0, {
      message: 'Image is required.',
    }),
});

export type FilesSchemaType = z.infer<typeof filesSchema>;
