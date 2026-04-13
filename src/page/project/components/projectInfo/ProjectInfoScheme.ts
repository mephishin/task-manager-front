import { z } from "zod";

export const projectInfoFormValidationScheme = z.object({
    projectId: z.string().optional(),
    description: z.string().min(1, {error: 'Описание проекта не может быть пустым'}),
    files: z.array(
        z.instanceof(File, {error: 'Необходимо загрузить файл корректного типа',})).optional(),
});

export type ProjectInfoScheme = z.infer<typeof  projectInfoFormValidationScheme>;