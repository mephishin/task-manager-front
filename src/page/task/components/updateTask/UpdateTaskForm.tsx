import React, {useEffect} from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTask, UpdateTaskAssignee, UpdateTaskFormValidationSchema } from "./UpdateTaskFormScheme";
import { Task } from "../../../../model/task/Task";
import {getLabel, Users} from "../../../../model/participant/Participant";
import {AutocompleteController, InputController} from "../../../../components/forms/FormFieldsControllers";
import {useTaskUpdate} from "../../../../hooks/query/task/useTask";

interface UpdateTaskFormProps {
    taskKey: string,
    task: Task,
    participants: Users[],updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({ taskKey, task, participants, updateTask }: UpdateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors }, resetField } = useForm<UpdateTask>({
        defaultValues: {
            key: taskKey,
            name: task.name,
            description: task.description,
            status: task.status,
            assignee: {id: task.assignee, name: task.assignee}
        },
        resolver: zodResolver(UpdateTaskFormValidationSchema)
    })

    const onSubmit = (data: UpdateTask) => {
        console.log(data)
        mutate({
            key: data.key,
            name: data.name,
            assignee: data.assignee.id,
            description: data.description,
        })
    }

    const {mutate, isSuccess, isPending} = useTaskUpdate(task.key);

    useEffect(() => {
        if (isSuccess && !isPending) {
            resetField("assignee", {defaultValue: {id: task.assignee, name: task.assignee}});
            resetField("name", {defaultValue: task.name});
            resetField("description", {defaultValue: task.description});
        }
    }, [isPending, isSuccess, resetField]);

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