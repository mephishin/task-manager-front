import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AutocompleteController, InputController, SelectController} from "./FormFieldsControllers";

export const UpdateTaskForm = (props) => {
    const {taskKey, task, statuses, participants, types, updateTask} = props;
    const {control, handleSubmit} = useForm({
        defaultValues: {
            name: task.name,
            description: task.description,
            status: task.status,
            type: task.type,
            assignee: task.assignee
        }
    })

    const onSubmit = (data) => {
        data.key = taskKey
        console.log(data)
        updateTask.mutate(data)
    }

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <InputController control={control} name={"name"}/>
                <InputController control={control} name={"description"}/>
                <SelectController control={control} name={"status"} options={statuses.map((status) => status.value)}/>
                <SelectController control={control} name={"type"} options={types.map((type) => type.value)}/>
                <AutocompleteController control={control} name={"assignee"} options={participants.map((participant) => participant.username)}/>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}