import React from "react";
import { Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputController, InputFileController } from "../../../components/forms/FormFieldsControllers";
import { PostComment, postCommentFormValidationSchema } from "../../../model/task/PostComment";
import AddCommentIcon from '@mui/icons-material/AddComment';

interface PostCommentFormProps {
    postCommentHandler: (postComment: PostComment) => void
}

export const PostCommentForm = ({postCommentHandler} : PostCommentFormProps) => {
    const { control, handleSubmit, formState: { errors } } = useForm<PostComment>({
        resolver: zodResolver(postCommentFormValidationSchema)
    })

    const onSubmit = (postComment: PostComment) => {
        postCommentHandler(postComment)
    }

    return (
        <Box sx={{ borderRadius: 20 }}>
            <Stack sx={{ backgroundColor: "white", borderRadius: 2 }}>
                <InputController
                    label="Комментарий"
                    control={control}
                    errors={errors}
                    name={"text"}
                    sx={{m: 1}}
                    multiline />
                <InputFileController
                    label='Прикрепить файлы'
                    control={control}
                    name='files'
                    errors={errors}
                    sx={{m: 1}} />
                <Button
                    variant="contained"
                    startIcon={<AddCommentIcon />}
                    sx={{ m: 1 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Добавить комментарий
                </Button>
            </Stack>
        </Box>
    )
}