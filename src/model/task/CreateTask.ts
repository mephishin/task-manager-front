import * as yup from 'yup';

export const createTaskFormValidationSchema = yup
   .object({
       name: yup.string().required('Обязательное поле'),
       description: yup.string().required('Обязательное поле'),
       type: yup.string().required('Обязательное поле'),
       project: yup.string().required('Обязательное поле'),
       assignee: yup.string().required('Обязательное поле'),
   });

export type CreateTask = yup.InferType<typeof createTaskFormValidationSchema>;