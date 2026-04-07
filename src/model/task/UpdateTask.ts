import { z } from "zod";

export const UpdateTaskFormAssigneeValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    id: z.string({ error: 'Обязательное поле' }),
});

export type UpdateTaskAssignee = z.infer<typeof UpdateTaskFormAssigneeValidationSchema>;

export const UpdateTaskFormValidationSchema = z.object({
    key: z.string({ error: 'Обязательное поле' }),
    name: z.string({ error: 'Обязательное поле' }),
    description: z.string({ error: 'Обязательное поле' }),
    status: z.string({ error: 'Обязательное поле' }),
    type: z.string({ error: 'Обязательное поле' }),
    assignee: UpdateTaskFormAssigneeValidationSchema,
});

export type UpdateTask = z.infer<typeof UpdateTaskFormValidationSchema>;
