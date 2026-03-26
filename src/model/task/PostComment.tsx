import { z } from "zod";

export const postCommentFormValidationSchema = z.object({
    text: z.string().min(1, 'Текст комментария не может быть пустым'),
    files: z.array(
        z.instanceof(File, {message: 'Необходимо загрузить файл корректного типа',})).optional(),
});

export type PostComment = z.infer<typeof  postCommentFormValidationSchema>;