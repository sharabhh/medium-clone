import z from "zod";

// signup input
export const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// signin input
export const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

// create blog input
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

// update blog input
export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
