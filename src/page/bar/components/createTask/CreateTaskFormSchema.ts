import { z } from "zod";

export const createTaskFormProjectValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    id: z.string({ error: 'Обязательное поле' }),
});

export type CreateTaskProject = z.infer<typeof createTaskFormProjectValidationSchema>;

export const createTaskFormAssigneeValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    id: z.string({ error: 'Обязательное поле' }),
});

export type CreateTaskAssignee = z.infer<typeof createTaskFormAssigneeValidationSchema>;

export const createTaskFormValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    description: z.string({ error: 'Обязательное поле' }),
    type: z.string({ error: 'Обязательное поле' }),
    project: createTaskFormProjectValidationSchema,
    assignee: createTaskFormAssigneeValidationSchema,
});

export type CreateTask = z.infer<typeof createTaskFormValidationSchema>;


