import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});