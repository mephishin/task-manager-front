import {z} from "zod";

export const UpdateTaskFormAssigneeValidationSchema = z.object({
    name: z.string({error: 'Обязательное поле'}),
    id: z.string({error: 'Обязательное поле'}),
}).nullable();

export type UpdateTaskAssignee = z.infer<typeof UpdateTaskFormAssigneeValidationSchema>;

export const UpdateTaskFormValidationSchema = z.object({
    name: z.string({error: 'Обязательное поле'}),
    description: z.string({error: 'Обязательное поле'}),
    assignee: UpdateTaskFormAssigneeValidationSchema,
});

export type UpdateTask = z.infer<typeof UpdateTaskFormValidationSchema>;
