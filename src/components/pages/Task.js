import {FormControl, Input, Stack, Typography} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, {useEffect, useState} from "react";
import {getTaskByKey, updateTaskByTaskKey} from "../../adapter/adapter";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

const fields = ["name", "description", "status", "type", "project"]

export const Task = () => {
    const [task, setTask] = useState({});
    const {key} = useParams();
    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            name: "",
            description: "",
            status: "",
            type: "",
            project: ""
        },
    })

    useEffect(() => {
        getTaskByKey(key)
            .then(task => {
                    console.log(task)
                    setValue("name", task.name);
                    setValue("description", task.description);
                    setValue("status", task.status);
                    setValue("type", task.type);
                    setValue("project", task.project);
                }
            )
            .catch(() => console.log("ERROR"));
    }, []);

    const onSubmit = (data) => {
        data.key = key;
        console.log(data)
        updateTaskByTaskKey(data)
            .then(task => {
                    setValue("name", task.name);
                    setValue("description", task.description);
                    setValue("status", task.status);
                    setValue("type", task.type);
                    setValue("project", task.project);
                }
            )
            .catch(() => console.log("ERROR"))
    }

    return (
        <Box sx={{ borderRadius: 20}}>
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