import React from "react";
import { Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { MultipleAutocompleteController, InputController } from "./FormFieldsControllers";
import { Users } from "../../model/participant/Participant";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProject, createProjectFormValidationSchema } from "../../model/project/CreateProject";

interface CreateProjectFormProps {
    onSubmit: SubmitHandler<CreateProject>,
    participants?: Array<Users>
}

export const CreateProjectForm = ({ onSubmit, participants }: CreateProjectFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateProject>({
        resolver: yupResolver(createProjectFormValidationSchema)
    })

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors} />
                <InputController
                    label="Префикс для ключа задачи"
                    control={control}
                    name={"taskPrefix"}
                    errors={errors} />
                <MultipleAutocompleteController
                    label={"Участники"}
                    control={control}
                    name={"participants"}
                    errors={errors}
                    options={participants!.map((participant) => participant.username)} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}