import { z } from "zod";

export const createTaskFormAssigneeValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    id: z.string({ error: 'Обязательное поле' }),
}).optional().nullable();

export type CreateTaskAssignee = z.infer<typeof createTaskFormAssigneeValidationSchema>;

export const createTaskFormValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    description: z.string({ error: 'Обязательное поле' }),
    assignee: createTaskFormAssigneeValidationSchema,
});

export type CreateTask = z.infer<typeof createTaskFormValidationSchema>;


