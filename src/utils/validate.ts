import { ZodSchema } from 'zod';

export const validate = async (schema: ZodSchema, data: any) => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((err) => err.message);

    throw new Error(errors.join(', '));
  }

  return result.data;
};