import { z } from 'zod';

export const testSchema = z.object({
  name: z.string().min(1, 'test.errors.name'),
  email: z.string().min(1, 'test.errors.email'),
  phone: z.string().min(1, 'test.errors.phone'),
});

export type TestFormData = z.infer<typeof testSchema>;

export type TestSchemaKeys = keyof typeof testSchema.shape;
