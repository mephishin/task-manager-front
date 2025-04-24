import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AutocompleteController, InputController, SelectController} from "./FormFieldsControllers";
import {Task, UpdateTask} from "../../model/task/Task";
import {TaskStatus} from "../../model/task/TaskStatus";
import {Participant} from "../../model/participant/Participant";
import {TaskType} from "../../model/task/TaskType";

interface UpdateTaskFormProps {
    taskKey: string | undefined,
    task: Task,
    statuses: Array<TaskStatus>,
    participants: Array<Participant>,
    types: Array<TaskType>,
    updateTask: SubmitHandler<UpdateTask>
}

export const UpdateTaskForm = ({taskKey, task, statuses, participants, types, updateTask}: UpdateTaskFormProps) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: task.name,
            description: task.description,
            status: task.status,
            type: task.type,
            assignee: task.assignee
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
                <InputController control={control} name={"name"}/>
                <InputController control={control} name={"description"}/>
                <SelectController control={control} name={"status"} options={statuses.map((status: TaskStatus) => status.value)}/>
                <SelectController control={control} name={"type"} options={types.map((type: TaskType) => type.value)}/>
                <AutocompleteController control={control} name={"assignee"} options={participants.map((participant: Participant) => participant.username)}/>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}