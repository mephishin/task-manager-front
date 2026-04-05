import React from "react";
import { Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CreateProject, createProjectFormValidationSchema } from "../../../model/project/CreateProject";
import { Users } from "../../../model/participant/Participant";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController, MultipleAutocompleteController } from "../../../components/forms/FormFieldsControllers";

interface CreateProjectFormProps {
    onSubmit: SubmitHandler<CreateProject>,
    participants: Array<Users>
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
                    errors={errors}
                    sx={{m: 5}} />
                <InputController
                    label="Префикс для ключа задачи"
                    control={control}
                    name={"taskPrefix"}
                    errors={errors}
                    sx={{m: 5}} />
                <MultipleAutocompleteController
                    label={"Участники"}
                    control={control}
                    name={"participants"}
                    errors={errors}
                    options={participants.map(participant =>
                        {return {id: participant.id, label: getLabel(participant)}})} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}

function getLabel(participant: Users): string {
    return participant.group
    ? participant.lastName + " " + participant.firstName + " " + participant.group
    : participant.lastName + " " + participant.firstName;
}
