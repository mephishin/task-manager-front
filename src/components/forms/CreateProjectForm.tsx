import React from "react";
import { Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { MultipleAutocompleteController, InputController } from "./FormFieldsControllers";
import { Participant } from "../../model/participant/Participant";
import { CreateProject } from "../../model/project/CreateProject";

interface CreateProjectFormProps {
    onSubmit: SubmitHandler<CreateProject>,
    participants?: Array<Participant>
}

export const CreateProjectForm = ({ onSubmit, participants }: CreateProjectFormProps) => {
    const { control, handleSubmit, register, formState:{ errors }} = useForm<CreateProject>()

    return (
<Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <Typography>Создание нового проекта</Typography>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    register={register("name", { required: {value: true, message:'Полe не может быть пустым'}})}
                    errors={errors}/>
                <InputController
                    label="Префикс для ключа задачи"
                    control={control} name={"taskPrefix"}
                    register={register("taskPrefix", { required:true, pattern: {
                        value: /^[A-Z]+/,
                        message:"Допускаются только заглавные латинские буквы"
                        }})}
                    errors={errors}/>
                <MultipleAutocompleteController label={"Участники"}  control={control} name={"participants"} options={participants!.map((participant) => participant.username)} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}