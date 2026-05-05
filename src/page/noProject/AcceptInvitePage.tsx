import {Box, Stack, TextField, Typography} from "@mui/material";
import {useProjectInviteAccept} from "../../hooks/query/project/useProject";
import {InputController,} from "../../components/forms/FormFieldsControllers";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AcceptInviteFormScheme, acceptInviteFormValidationScheme} from "./AcceptInviteFormScheme";
import {useNavigate} from "react-router-dom";

export const AcceptInvitePage = () => {
    const {mutate, isSuccess, isPending} = useProjectInviteAccept()
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<AcceptInviteFormScheme>({
        resolver: zodResolver(acceptInviteFormValidationScheme)
    })

    const onSubmit = (acceptInviteFormScheme: AcceptInviteFormScheme) => {
        mutate(acceptInviteFormScheme.inviteKey)
    }

    useEffect(() => {
        if (isSuccess && !isPending) {
            navigate("/", {replace: true});
        }
    }, [isSuccess, isPending, navigate]);

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"92vh"}>
            <Stack>
                <Typography fontSize={20} color={"primary"}>Вы еще не находитесь на проекте.</Typography>
                <Typography fontSize={20} color={"primary"}>Чтобы присоединиться, запросите ключ у руководителя проекта.</Typography>
                <Stack sx={{m: 2}}>
                    <InputController
                        label="Ключ приглашение"
                        control={control}
                        errors={errors}
                        name={"inviteKey"}
                        sx={{ m: 1 }}/>
                    <Button
                        variant="contained"
                        sx={{ m: 1 }}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Принять приглашение
                    </Button>
                </Stack>
            </Stack>
        </Box>
    )
}