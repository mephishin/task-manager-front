import React, {useEffect} from "react";
import {Button, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdateTask, UpdateTaskAssignee, UpdateTaskFormValidationSchema} from "./UpdateTaskFormScheme";
import {getLabel} from "../../../../model/task/Task";
import {AutocompleteController, InputController} from "../../../../components/forms/FormFieldsControllers";
import {useTaskGet, useTaskUpdate} from "../../../../hooks/query/task/useTask";
import {useUsersByProjectIdGet} from "../../../../hooks/query/users/useUsers";

interface UpdateTaskFormProps {
    taskKey: string
}

export const UpdateTaskForm = ({taskKey}: UpdateTaskFormProps) => {
    const {data: task, isSuccess: taskIsSuccess, isPending: taskIsPending} = useTaskGet(taskKey);
    const {mutate: updateTask} = useTaskUpdate(task?.key, task?.project.id);
    const {
        data: participants,
        isSuccess: participantsIsSuccess,
        isPending: participantsIsPending
    } = useUsersByProjectIdGet(task?.project?.id);

    const {control, handleSubmit, formState: {errors}, setValue} = useForm<UpdateTask>({
        resolver: zodResolver(UpdateTaskFormValidationSchema)
    })

    useEffect(() => {
        if (taskIsSuccess && !taskIsPending) {
            setValue("name", task!.name);
            setValue("description", task!.description);
            setValue("assignee", task!.assignee ? {id: task!.assignee.id, name: getLabel(task!.assignee)} : null);
        }
    }, [taskIsSuccess, taskIsPending, setValue]);

    const onSubmit = (data: UpdateTask) => {
        updateTask({
            key: taskKey!,
            name: data.name,
            assignee: data.assignee ? data.assignee.id : null,
            description: data.description,
        })
    }

    return (
        <Stack>
            <InputController
                label="Название"
                control={control}
                errors={errors}
                name={"name"}
                sx={{m: 5}}/>
            <InputController
                label="Описание"
                control={control}
                errors={errors}
                name={"description"}
                sx={{m: 5}}
                multiline/>
            <AutocompleteController<UpdateTaskAssignee>
                label="Исоплнитель задачи"
                control={control}
                name={"assignee"}
                errors={errors}
                options={participants?.map(user => {
                    return {id: user.id, name: getLabel(user)}
                })}
                getLabel={(assignee: UpdateTaskAssignee) => assignee?.name ? assignee?.name : ""}
                getId={(assignee: UpdateTaskAssignee) => assignee?.id ? assignee.id : ""}
                sx={{m: 5}}/>
            <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
        </Stack>
    )
}