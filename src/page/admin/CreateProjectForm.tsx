import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProject, createProjectFormValidationSchema, CreateProjectParticipant } from "./CreateProjectFormSchema";
import {useProjectCreate} from "../../hooks/query/project/useProject";
import {InputController, MultipleAutocompleteController} from "../../components/forms/FormFieldsControllers";
import {getLabel} from "../../model/task/Task";
import {useUsersByProjectIdGet} from "../../hooks/query/users/useUsers";

export const CreateProjectForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateProject>({
        resolver: zodResolver(createProjectFormValidationSchema)
    })

    const onSubmit = (data: CreateProject) => {
        createProject.mutate({
            name: data.name,
            description: data.description,
            participants: data.participants.map(p => p.id),
            taskPrefix: data.taskPrefix,
        })
    }
    const createProject = useProjectCreate();
    const {data: users} = useUsersByProjectIdGet();


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
                    options={users?.map(participant => { return { id: participant.id, name: getLabel(participant) }; })}
                    getLabel={(option: CreateProjectParticipant) => option.name}
                    getId={(option: CreateProjectParticipant) => option.id} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}
