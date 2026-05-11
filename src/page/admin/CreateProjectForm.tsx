import React, {useEffect, useState} from "react";
import {Alert, Snackbar, Stack} from "@mui/material";
import {useForm} from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateProject, createProjectFormValidationSchema, CreateProjectParticipant} from "./CreateProjectFormSchema";
import {useProjectCreate} from "../../hooks/query/project/useProject";
import {AutocompleteController, InputController} from "../../components/forms/FormFieldsControllers";
import {getLabel} from "../../model/task/Task";
import {userUsersByRoleGet} from "../../hooks/query/users/useUsers";
import {useAuth} from "../../AuthProvider";

export const CreateProjectForm = () => {
    const {LEADER} = useAuth();
    const {mutate, isSuccess, isPending, isError} = useProjectCreate();
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState("");

    const {control, handleSubmit, formState: {errors}, reset} = useForm<CreateProject>({
        resolver: zodResolver(createProjectFormValidationSchema)
    })

    const onSubmit = (data: CreateProject) => {
        mutate({
            name: data.name,
            description: data.description,
            leader: data.leader.id,
            taskPrefix: data.taskPrefix,
        })
    }
    const {data: users} = userUsersByRoleGet(LEADER, true);

    useEffect(() => {
        if (!isPending) {
            if (isError) {
                setResult("error")
                setOpen(true);
            } else if (isSuccess) {
                reset();
                setResult("success")
                setOpen(true);
            }
        }
    }, [isSuccess, isPending, isError]);

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors}
                    sx={{m: 5}}/>
                <InputController
                    label="Префикс для ключа задачи"
                    control={control}
                    name={"taskPrefix"}
                    errors={errors}
                    sx={{m: 5}}/>
                <InputController
                    label="Описание проекта"
                    control={control}
                    name={"description"}
                    errors={errors}
                    sx={{m: 5}}/>
                <AutocompleteController<CreateProjectParticipant>
                    label={"Участники"}
                    control={control}
                    name={"leader"}
                    errors={errors}
                    options={users?.map(participant => {
                        return {id: participant.id, name: getLabel(participant)};
                    })}
                    getLabel={(option: CreateProjectParticipant) => option.name}
                    getId={(option: CreateProjectParticipant) => option.id}
                    sx={{m: 5}}/>
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
                {open && (
                    <Snackbar
                        open={open}
                        autoHideDuration={9000}
                        onClose={() => setOpen(false)}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        {result === "success"
                            ? (<Alert severity="success">Проект успешно создан!</Alert>)
                            : (<Alert severity="error">Произошла ошибка(</Alert>)
                        }
                    </Snackbar>
                )}
            </Stack>
        </Box>
    )
}
