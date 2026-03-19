import * as yup from 'yup';

export const createProjectFormValidationSchema = yup
    .object({
        name: yup.string().required('Обязательное поле'),
        taskPrefix: yup.string().required('Обязательное поле').matches(/^[A-Z]+/, "Допускаются только заглавные латинские буквы"),
        participants: yup.array().of(yup.string()).min(2, "В проект должно быть минимум два участника").required('Обязательное поле'),
    });

export type CreateProject = yup.InferType<typeof createProjectFormValidationSchema>;