import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTask, UpdateTaskAssignee, UpdateTaskFormValidationSchema } from "./UpdateTaskFormScheme";
import { Task } from "../../../../model/task/Task";
import {getLabel, Users} from "../../../../model/participant/Participant";
import AuthService from "../../../../AuthService";
import {AutocompleteController, InputController} from "../../../../components/forms/FormFieldsControllers";

interface UpdateTaskFormProps {
    taskKey: string,
    task: Task,
    participants: Users[],
    types: string[],
    updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({ taskKey, task, participants, updateTask }: UpdateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateTask>({
        defaultValues: {
            key: taskKey,
            name: task.name,
            description: task.description,
            status: task.status,
            type: task.type,
            assignee: {id: AuthService.getId(), name: AuthService.getFullName()}
        },
        resolver: zodResolver(UpdateTaskFormValidationSchema)
    })

    const onSubmit = (data: UpdateTask) => {
        console.log(data)
        updateTask(data)
    }

    return (
            <Stack>
                <InputController
                    label="Название"
                    control={control}
                    errors={errors}
                    name={"name"}
                    sx={{ m: 5 }} />
                <InputController
                    label="Описание"
                    control={control}
                    errors={errors}
                    name={"description"}
                    sx={{ m: 5 }}
                    multiline />
                <AutocompleteController<UpdateTaskAssignee>
                    label="Исоплнитель задачи"
                    control={control}
                    name={"assignee"}
                    errors={errors}
                    options={participants.map(user => { return { id: user.id, name: getLabel(user) } })}
                    getLabel={(assignee: UpdateTaskAssignee) => assignee.name}
                    getId={(assignee: UpdateTaskAssignee) => assignee.id}/>
                <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
            </Stack>
    )
}