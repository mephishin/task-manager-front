import React from "react";
import {Stack, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {AutocompleteController, InputController, SelectController} from "./FormFieldsControllers";

export const CreateTaskForm = (props) => {
    const {onSubmit, types, projects, participants} = props;

    const {control, handleSubmit} = useForm({})

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <Typography>Создание новой задачи</Typography>
                <InputController control={control} name={"name"}/>
                <InputController control={control} name={"description"}/>
                <SelectController control={control} name={"type"} options={types.map(type => type.value)}/>
                <AutocompleteController control={control} name={"project"} options={projects.map(project => project.name)}/>
                <AutocompleteController control={control} name={"assignee"} options={participants.map(project => project.username)}/>
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}