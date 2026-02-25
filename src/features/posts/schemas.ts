import { z } from "zod";

export const postEditFormSchema = z.object({
  title: z.string().min(3, "3글자 이상 입력 필요."),
  content: z.string().min(10, "10글자 이상 입력 필요"),
});

export type PostEditFormSchema = z.infer<typeof postEditFormSchema>;

export const commentWriteForm = z.object({
  content: z.string().min(4, "4글자 이상 입력 필요."),
  parentId: z.number().optional(),
});
export type CommentWriteForm = z.infer<typeof commentWriteForm>;
