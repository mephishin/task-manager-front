import React from "react";
import { Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AutocompleteController, InputController, SelectController } from "./FormFieldsControllers";
import { Project } from "../../model/project/Project";
import { Participant } from "../../model/participant/Participant";
import { CreateTask } from "../../model/task/CreateTask";
import AuthService from "../../AuthService";

interface CreateTaskFormProps {
    onSubmit: SubmitHandler<CreateTask>,
    types?: Array<string>,
    projects?: Array<Project>,
    participants?: Array<Participant>
}

export const CreateTaskForm = ({ onSubmit, types, projects, participants }: CreateTaskFormProps) => {
    const { control, handleSubmit } = useForm<CreateTask>({
        defaultValues: {
            assignee: AuthService.getUsername()
        }
    })

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <Typography>Создание новой задачи</Typography>
                <InputController control={control} name={"name"} />
                <InputController control={control} name={"description"} />
                <SelectController control={control} name={"type"} options={types?.map((type) => type)} />
                <AutocompleteController control={control} name={"project"} options={projects!.map((project) => project.name)} />
                <AutocompleteController control={control} name={"assignee"} options={participants!.map((project) => project.username)} />
                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Stack>
        </Box>
    )
}