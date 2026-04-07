import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProject, createProjectFormValidationSchema, CreateProjectParticipant } from "./CreateProjectFormSchema";
import { getLabel, Users } from "../../../../model/participant/Participant";
import { InputController, MultipleAutocompleteController } from "../../../../components/forms/FormFieldsControllers";

interface CreateProjectFormProps {
    onSubmit: SubmitHandler<CreateProject>,
    participants: Array<Users>
}

export const CreateProjectForm = ({ onSubmit, participants }: CreateProjectFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateProject>({
        resolver: zodResolver(createProjectFormValidationSchema)
    })

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <InputController
                    label="Префикс для ключа задачи"
                    control={control}
                    name={"taskPrefix"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <InputController
                    label="Описание проекта"
                    control={control}
                    name={"description"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <MultipleAutocompleteController<CreateProjectParticipant>
                    label={"Участники"}
                    control={control}
                    name={"participants"}
                    errors={errors}
                    options={participants.map(participant => { return { id: participant.id, name: getLabel(participant) }; })}
                    getLabel={(option: CreateProjectParticipant) => option.name}
                    getId={(option: CreateProjectParticipant) => option.id} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}
