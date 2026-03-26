import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Task } from "../../../model/task/Task";
import { Users } from "../../../model/participant/Participant";
import { UpdateTask, UpdateTaskFormValidationSchema } from "../../../model/task/UpdateTask";
import { yupResolver } from "@hookform/resolvers/yup";
import { AutocompleteController, InputController } from "../../../components/forms/FormFieldsControllers";

interface UpdateTaskFormProps {
    taskKey: string,
    task?: Task,
    statuses?: Array<string>,
    participants?: Array<Users>,
    types?: Array<string>,
    updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({ taskKey, task, participants, updateTask }: UpdateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateTask>({
        defaultValues: {
            name: task?.name,
            description: task?.description,
            status: task?.status,
            type: task?.type,
            assignee: task?.assignee
        },
        resolver: yupResolver(UpdateTaskFormValidationSchema)
    })

    const onSubmit = (data: UpdateTask) => {
        data.key = taskKey
        console.log(data)
        updateTask(data)
    }

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <InputController
                    label="Название"
                    control={control}
                    errors={errors}
                    name={"name"}
                    sx={{m: 5}} />
                <InputController
                    label="Описание"
                    control={control}
                    errors={errors}
                    name={"description"}
                    sx={{m: 5}} />
                <AutocompleteController
                    label="Исоплнитель задачи"
                    control={control}
                    name={"assignee"}
                    errors={errors}
                    options={participants!.map((participant) => participant.username)} />
                <Button onClick={handleSubmit(onSubmit)}>Сохранить</Button>
            </Stack>
        </Box>
    )
}