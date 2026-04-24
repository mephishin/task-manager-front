import React, {useEffect} from "react";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CreateTask,
    CreateTaskAssignee,
    createTaskFormValidationSchema
} from "./CreateTaskFormSchema";
import { getLabel } from "../../../../model/participant/Participant";
import AuthService from "../../../../AuthService";
import { AutocompleteController, InputController } from "../../../../components/forms/FormFieldsControllers";
import {useUsersGet} from "../../../../hooks/query/users/useUsers";
import {useTaskCreate} from "../../../../hooks/query/task/useTask";
import {useParams} from "react-router-dom";

interface CreateTaskFormProps {
}

const CreateTaskForm = ({ }: CreateTaskFormProps) => {
    const { projectId, projectName } = useParams();

    const users = useUsersGet();
    const {mutate, isPending, isSuccess} = useTaskCreate();

    const onSubmit = (data: CreateTask) => {
        mutate({
            name: data.name,
            description: data.description,
            assignee: data.assignee?.id,
            project: projectId!,
        })
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateTask>({
        defaultValues: {
            assignee: {id: AuthService.getId(), name: AuthService.getFullName()}
        } ,
        resolver: zodResolver(createTaskFormValidationSchema),
    })

    return (users.data &&
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 1 }}>
                <InputController
                    label="Название"
                    control={control}
                    name={"name"}
                    errors={errors}
                    sx={{ m: 5 }} />
                <InputController
                    label="Описание"
                    control={control}
                    name={"description"}
                    errors={errors}
                    multiline
                    sx={{ m: 5 }} />
                <AutocompleteController<CreateTaskAssignee>
                    label={'Исполнитель'}
                    control={control}
                    name={"assignee"}
                    options={users.data.map(user => { return { id: user.id, name: getLabel(user) }; })}
                    errors={errors}
                    getLabel={(assignee: CreateTaskAssignee) => assignee?.name ? assignee?.name : ""}
                    getId={(assignee: CreateTaskAssignee) => assignee?.id ? assignee.id : ""} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}

export default CreateTaskForm