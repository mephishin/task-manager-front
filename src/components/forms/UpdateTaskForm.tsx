import React from "react";
import {Stack} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AutocompleteController, InputController} from "./FormFieldsControllers";
import {Task, UpdateTask} from "../../model/task/Task";
import {Participant} from "../../model/participant/Participant";

interface UpdateTaskFormProps {
    taskKey?: string,
    task?: Task,
    statuses?: Array<string>,
    participants?: Array<Participant>,
    types?: Array<string>,
    updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({taskKey, task, statuses, participants, types, updateTask}: UpdateTaskFormProps) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: task?.name,
            description: task?.description,
            status: task?.status,
            type: task?.type,
            assignee: task?.assignee
        }
    })

    const onSubmit = (data: UpdateTask) => {
        data.key = taskKey
        console.log(data)
        updateTask(data)
    }

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <InputController label="Название" control={control} name={"name"}/>
                <InputController label="Описание" control={control} name={"description"}/>
                <AutocompleteController label="Исоплнитель задачи" control={control} name={"assignee"} options={participants!.map((participant: Participant) => participant.username)}/>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}