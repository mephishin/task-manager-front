import { z } from "zod";

export const createProjectFormParticipantsValidationSchema = z.object({
    id: z.string({ error: 'Обязательное поле' }),
    name: z.string({ error: 'Обязательное поле' }),
});

export type CreateProjectParticipant = z.infer<typeof createProjectFormParticipantsValidationSchema>;

export const createProjectFormValidationSchema = z.object({
    name: z.string({ error: 'Обязательное поле' }),
    description: z.string({ error: 'Обязательное поле' }),
    taskPrefix: z.string({ error: 'Обязательное поле' }).regex(/^[A-Z]+/, {error: "Допускаются только заглавные латинские буквы"}),
    participants: z.array(createProjectFormParticipantsValidationSchema).min(2, {error: "В проект должно быть минимум два участника"}),
});

export type CreateProject = z.infer<typeof createProjectFormValidationSchema>;