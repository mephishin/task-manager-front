import React from "react";
import {createTask} from "../adapter/resources";
import {Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {fields} from "../model/TaskFormFields";

export const CreateTaskForm = (props) => {
    const { control, handleSubmit} = useForm({})

    const onSubmit = (data) => {
        createTask(data)
            .catch(() => console.log("ERROR"))
        props.handleClose()
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