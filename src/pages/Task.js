import {Input, Stack, Typography} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, {useEffect} from "react";
import {getTaskByKey, updateTaskByTaskKey} from "../adapter/resources";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const fields = ["name", "description", "status", "type", "project"]

export const Task = () => {
    const {key} = useParams();
    const { control, handleSubmit, setValue } = useForm({})

    useEffect(() => {
        getTaskByKey(key)
            .then(task => {
                    setData(task)
                }
            )
            .catch(() => console.log("ERROR"));
    }, []);

    const onSubmit = (data) => {
        data.key = key;
        console.log(data)
        updateTaskByTaskKey(data)
            .then(task => {
                    setData(task)
                }
            )
            .catch(() => console.log("ERROR"))
    }

    const setData = (task) => {
        fields.map(field => setValue(field, task[field]))
    }

    return (
        <Box sx={{ borderRadius: 20}}>
            <Typography>Edit task {key}:</Typography>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5}}>
                {fields.map((field) => (
                    <Controller
                        name={field}
                        control={control}
                        render={({ field }) => <Input {...field} sx={{ margin: 5}}/>}
                    />
                ))}
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}