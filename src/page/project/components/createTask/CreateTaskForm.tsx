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
import { getLabel } from "../../../../hooks/query/users/useUsersHttpDto";
import { AutocompleteController, InputController } from "../../../../components/forms/FormFieldsControllers";
import {useUsersByProjectIdGet} from "../../../../hooks/query/users/useUsers";
import {useTaskCreate} from "../../../../hooks/query/task/useTask";
import {useAuth} from "../../../../AuthProvider";

interface CreateTaskFormProps {
    projectId: string
}

const CreateTaskForm = ({ projectId }: CreateTaskFormProps) => {

    const users = useUsersByProjectIdGet(projectId);
    const {mutate} = useTaskCreate();

    const {getId, getFullName} = useAuth();

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
            assignee: {id: getId(), name: getFullName()}
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
                    options={users.data.filter(user => user.project).map(user => { return { id: user.id, name: getLabel(user) }; })}
                    errors={errors}
                    getLabel={(assignee: CreateTaskAssignee) => assignee?.name ? assignee?.name : ""}
                    getId={(assignee: CreateTaskAssignee) => assignee?.id ? assignee.id : ""} />
                <Button onClick={handleSubmit(onSubmit)}>Подтвердить</Button>
            </Stack>
        </Box>
    )
}

export default CreateTaskForm