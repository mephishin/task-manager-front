import React, {useEffect} from "react";
import {Button, Stack} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTask, UpdateTaskAssignee, UpdateTaskFormValidationSchema } from "./UpdateTaskFormScheme";
import { getLabel } from "../../../../model/task/Task";
import {AutocompleteController, InputController} from "../../../../components/forms/FormFieldsControllers";
import {useTaskGet, useTaskUpdate} from "../../../../hooks/query/task/useTask";
import {useUsersByProjectIdGet} from "../../../../hooks/query/users/useUsers";
import {useParams} from "react-router-dom";

export const UpdateTaskForm = () => {
    const {key} = useParams();

    const {data: task, isSuccess: taskIsSuccess, isPending: taskIsPending} = useTaskGet(key);
    const {mutate: updateTask} = useTaskUpdate(task?.key, task?.project.id);
    const {data: participants, isSuccess: participantsIsSuccess, isPending: participantsIsPending} = useUsersByProjectIdGet(task?.project?.id);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<UpdateTask>({
        resolver: zodResolver(UpdateTaskFormValidationSchema)
    })

    useEffect(() => {
        if (taskIsSuccess && !taskIsPending) {
            setValue("name",  task!.name);
            setValue("description",task!.description);
            setValue("assignee", {id: task!.assignee.id, name: getLabel(task!.assignee)});
        }
    }, [taskIsSuccess, taskIsPending, setValue]);

    const onSubmit = (data: UpdateTask) => {
        updateTask({
            key: key!,
            name: data.name,
            assignee: data.assignee.id,
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
                    options={participants?.map(user => { return { id: user.id, name: getLabel(user) } })}
                    getLabel={(assignee: UpdateTaskAssignee) => assignee.name}
                    getId={(assignee: UpdateTaskAssignee) => assignee.id}/>
                <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
            </Stack>
    )
}