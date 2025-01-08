import * as z from "zod";

export const BlogSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string(),
  author: z.string(),
  content: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  usersId: z.string().cuid().optional(),
});

export const UserSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  blogs: z.array(BlogSchema).optional(),
});
