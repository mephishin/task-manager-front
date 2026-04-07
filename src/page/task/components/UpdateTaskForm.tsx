import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Task } from "../../../model/task/Task";
import { getLabel, Users } from "../../../model/participant/Participant";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTask, UpdateTaskAssignee, UpdateTaskFormValidationSchema } from "../../../model/task/UpdateTask";
import { AutocompleteController, InputController } from "../../../components/forms/FormFieldsControllers";
import AuthService from "../../../AuthService";

interface UpdateTaskFormProps {
    taskKey: string,
    task: Task,
    participants: Array<Users>,
    types: Array<string>,
    updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({ taskKey, task, participants, updateTask }: UpdateTaskFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<UpdateTask>({
        defaultValues: {
            name: task?.name,
            description: task?.description,
            status: task?.status,
            type: task?.type,
            assignee: {id: AuthService.getId(), name: AuthService.getFullName()}
        },
        resolver: zodResolver(UpdateTaskFormValidationSchema)
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
                    sx={{ m: 5 }} />
                <InputController
                    label="Описание"
                    control={control}
                    errors={errors}
                    name={"description"}
                    sx={{ m: 5 }} />
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
        </Box>
    )
}