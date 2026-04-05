import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CreateTask, createTaskFormValidationSchema } from "../../../model/task/CreateTask";
import { Project } from "../../../model/project/Project";
import { getLabel, Users } from "../../../model/participant/Participant";
import AuthService from "../../../AuthService";
import { yupResolver } from "@hookform/resolvers/yup";
import { AutocompleteController, InputController, SelectController } from "../../../components/forms/FormFieldsControllers";

interface CreateTaskFormProps {
    onSubmit: SubmitHandler<CreateTask>,
    types: Array<string>,
    projects: Array<Project>,
    users: Array<Users>
    project: Project
}

export const CreateTaskForm = ({ onSubmit, types, projects, users, project }: CreateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateTask>({
        defaultValues: {
            type: "Задача",
            assignee: AuthService.getUsername(),
            project: project?.name
        },
        resolver: yupResolver(createTaskFormValidationSchema),
    })

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors}
                    sx={{m: 5}} />
                <InputController
                    label="Описание"
                    control={control}
                    name={"description"}
                    errors={errors}
                    sx={{m: 5}} />
                <SelectController
                    label='Тип'
                    control={control}
                    name={"type"}
                    options={types}
                    errors={errors} />
                <AutocompleteController
                    label={'Проект'}
                    control={control}
                    name={"project"}
                    options={projects.map(project => {return {id: project.key, label: project.name}})}
                    errors={errors} />
                <AutocompleteController
                    label={'Исполнитель'}
                    control={control}
                    name={"assignee"}
                    options={users.map(user =>
                        {return {id: user.id, label: getLabel(user)}})}
                    errors={errors} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}