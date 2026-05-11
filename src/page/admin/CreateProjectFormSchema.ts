import {z} from "zod";

export const createProjectFormLeaderValidationSchema = z.object({
    id: z.string({error: 'Обязательное поле'}),
    name: z.string({error: 'Обязательное поле'}),
});

export type CreateProjectParticipant = z.infer<typeof createProjectFormLeaderValidationSchema>;

export const createProjectFormValidationSchema = z.object({
    name: z.string({error: 'Обязательное поле'}),
    description: z.string({error: 'Обязательное поле'}),
    taskPrefix: z.string({error: 'Обязательное поле'}).regex(/^[A-Z]+/, {error: "Допускаются только заглавные латинские буквы"}),
    leader: createProjectFormLeaderValidationSchema,
});

export type CreateProject = z.infer<typeof createProjectFormValidationSchema>;