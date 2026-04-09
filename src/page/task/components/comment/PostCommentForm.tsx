import React, {useEffect} from "react";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCommentIcon from '@mui/icons-material/AddComment';
import {CommentFormScheme, commentFormValidationScheme} from "./CommentFormScheme";
import {InputController, InputFileController} from "../../../../components/forms/FormFieldsControllers";
import {useTaskCommentSave} from "../../../../hooks/query/comment/useComment";
import {useParams} from "react-router-dom";
import {transformFilesToZip} from "../../../../util/ZIp";

interface PostCommentFormProps {

}

export const PostCommentForm = ({ }: PostCommentFormProps) => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CommentFormScheme>({
        resolver: zodResolver(commentFormValidationScheme)
    })

    const {key} = useParams();

    const {mutate, isSuccess, isPending} = useTaskCommentSave(key!);

    const onSubmit = (comment: CommentFormScheme) => {
        comment.files
            ? transformFilesToZip(comment.files).then(zipped => mutate({
                zippedFiles: zipped,
                text: comment.text
            })) : mutate({text: comment.text})
    }

    useEffect(() => {
        if (isSuccess && !isPending) {
            reset();
        }
    }, [isSuccess, isPending, reset]);

    return (
            <Stack sx={{m: 2}}>
                <InputController
                    label="Комментарий"
                    control={control}
                    errors={errors}
                    name={"text"}
                    sx={{ m: 1 }}
                    multiline />
                <InputFileController
                    label='Прикрепить файлы'
                    control={control}
                    name='files'
                    errors={errors}
                    sx={{ m: 1 }} />
                <Button
                    variant="contained"
                    startIcon={<AddCommentIcon />}
                    sx={{ m: 1 }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Добавить комментарий
                </Button>
            </Stack>
    )
}