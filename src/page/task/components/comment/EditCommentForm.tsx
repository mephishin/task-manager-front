import {CommentFormScheme, commentFormValidationScheme} from "./CommentFormScheme";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {InputController, InputFileController} from "../../../../components/forms/FormFieldsControllers";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import {TaskComment} from "../../../../model/task/TaskComment";
import {useParams} from "react-router-dom";
import {transformFilesToZip} from "../../../../util/ZIp";
import {useTaskCommentUpdate} from "../../../../hooks/query/comment/useComment";

interface EditCommentFormProps {
    editable: boolean,
    comment: TaskComment,
    setIsEditing: React.Dispatch<React.SetStateAction<string>>
}

export const EditCommentForm = ({editable, comment, setIsEditing}: EditCommentFormProps) => {
    const {control, resetField, handleSubmit, formState: {errors}} = useForm<CommentFormScheme>({
        defaultValues: {
            commentId: comment.id,
            text: comment.text
        },
        resolver: zodResolver(commentFormValidationScheme)
    })
    const {key} = useParams();
    const {mutate, isPending, isSuccess} = useTaskCommentUpdate(key!);

    const onSubmit = (comment: CommentFormScheme) => {
        comment.files
            ? transformFilesToZip(comment.files).then(zipped => mutate({
                commentId: comment.commentId!,
                zippedFiles: zipped,
                text: comment.text
            })) : mutate({commentId: comment.commentId!, text: comment.text})
        setIsEditing('')
    }

    useEffect(() => {
        if (isSuccess && !isPending) {
            resetField("text", {defaultValue: comment.text});
        }
    }, [isPending, isSuccess, resetField]);

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", borderRadius: 2}}>
                <InputController
                    control={control}
                    errors={errors}
                    name={"text"}
                    multiline
                    variant={editable ? "outlined" : "standard"}
                    slotProps={{
                        input: {
                            readOnly: !editable,
                            disableUnderline: !editable
                        }
                    }}
                    fullWidth/>
                {editable && (<>
                    <InputFileController
                        label='Прикрепить файлы'
                        control={control}
                        name='files'
                        errors={errors}
                        sx={{mt: 1}}/>
                    <Button
                        variant="contained"
                        sx={{mt: 1}}
                        onClick={handleSubmit(onSubmit)}>
                        {"Cохранить"}
                    </Button></>)}
            </Stack>
        </Box>
    )
}