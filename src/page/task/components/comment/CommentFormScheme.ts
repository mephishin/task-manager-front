import { z } from "zod";

export const commentFormValidationScheme = z.object({
    commentId: z.string().optional(),
    text: z.string().min(1, 'Текст комментария не может быть пустым'),
    files: z.array(
        z.instanceof(File, {message: 'Необходимо загрузить файл корректного типа',})).optional(),
});

export type CommentFormScheme = z.infer<typeof  commentFormValidationScheme>;