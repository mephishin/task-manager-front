import React, {useEffect} from "react";
import {updateTaskByTaskKey} from "../../adapter/resources";
import {Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {fields} from "../../model/TaskFormFields";

export const UpdateTaskForm = (props) => {
    const {task, taskKey} = props;
    const { control, handleSubmit, setValue } = useForm({})

    useEffect(() => {
        setData(task);
    }, [])

    const onSubmit = (data) => {
        data.key = taskKey;
        updateTaskByTaskKey(data)
            .then(task => {
                    setData(task)
                }
            )
            .catch(() => console.log("ERROR"));
    }

    const setData = (res) => {
        fields.map(field => setValue(field, res[field]))
    }

    return(
        <Box sx={{ borderRadius: 20}}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5}}>
                {fields.map((field) => (
                    <Controller
                        name={field}
                        control={control}
                        render={({ field }) => <TextField {...field} label={field.name} sx={{ margin: 5}}/>}
                    />
                ))}
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}