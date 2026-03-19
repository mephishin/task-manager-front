import * as yup from 'yup';

export const UpdateTaskFormValidationSchema = yup
    .object({
        key: yup.string().required('Обязательное поле'),
        name: yup.string().required('Обязательное поле'),
        description: yup.string().required('Обязательное поле'),
        status: yup.string().required('Обязательное поле'),
        type: yup.string().required('Обязательное поле'),
        assignee: yup.string().required('Обязательное поле'),
    });

export type UpdateTask = yup.InferType<typeof UpdateTaskFormValidationSchema>;