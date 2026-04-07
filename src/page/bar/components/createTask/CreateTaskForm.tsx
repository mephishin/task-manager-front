import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "../../../../model/project/Project";
import { CreateTask, CreateTaskAssignee, createTaskFormValidationSchema, CreateTaskProject } from "./CreateTaskFormSchema";
import { getLabel, Users } from "../../../../model/participant/Participant";
import AuthService from "../../../../AuthService";
import { AutocompleteController, InputController, SelectController } from "../../../../components/forms/FormFieldsControllers";

interface CreateTaskFormProps {
    onSubmit: SubmitHandler<CreateTask>,
    types: Array<string>,
    projects: Array<Project>,
    users: Array<Users>
    project?: Project
}

export const CreateTaskForm = ({ onSubmit, types, projects, users, project }: CreateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateTask>({
        defaultValues: project ? {
            type: "Задача",
            assignee: { id: AuthService.getId(), name: AuthService.getFullName() },
            project: { id: project.key, name: project.name }
        } : {
            type: "Задача",
            assignee: { id: AuthService.getId(), name: AuthService.getFullName() },
        },
        resolver: zodResolver(createTaskFormValidationSchema),
    })

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <InputController
                    label="Описание"
                    control={control}
                    name={"description"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <SelectController
                    label='Тип'
                    control={control}
                    name={"type"}
                    options={types}
                    errors={errors} />
                <AutocompleteController<CreateTaskProject>
                    label={'Проект'}
                    control={control}
                    name={"project"}
                    options={projects.map(project => { return { id: project.key, name: project.name }; })}
                    errors={errors}
                    getLabel={(project: CreateTaskProject) => project.name}
                    getId={(project: CreateTaskProject) => project.id} />
                <AutocompleteController<CreateTaskAssignee>
                    label={'Исполнитель'}
                    control={control}
                    name={"assignee"}
                    options={users.map(user => { return { id: user.id, name: getLabel(user) }; })}
                    errors={errors}
                    getLabel={(assignee: CreateTaskAssignee) => assignee.name}
                    getId={(assignee: CreateTaskAssignee) => assignee.id} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}