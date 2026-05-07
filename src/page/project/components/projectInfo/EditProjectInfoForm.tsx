import React, {useEffect} from "react";
import {Button, Stack} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {ProjectInfoScheme, projectInfoFormValidationScheme} from "./ProjectInfoScheme";
import {InputController, InputFileController} from "../../../../components/forms/FormFieldsControllers";
import {transformFilesToZip} from "../../../../util/ZIp";
import Box from "@mui/material/Box";
import {useProjectInfoSave} from "../../../../hooks/query/project/useProject";

interface EditProjectInfoFormProps {
    editable: boolean,
    description: string,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    projectId: string
}

export const EditProjectInfoForm = ({editable, description, setIsEditing, projectId}: EditProjectInfoFormProps) => {
    const {control, resetField, handleSubmit, formState: {errors}} = useForm<ProjectInfoScheme>({
        defaultValues: {
            projectId: projectId,
            description: description,
        },
        resolver: zodResolver(projectInfoFormValidationScheme)
    })

    const saveProjectInfo = useProjectInfoSave(projectId!);

    const {mutate, isPending, isSuccess} = useProjectInfoSave(projectId!);

    const onSubmit = (projectInfo: ProjectInfoScheme) => {
        projectInfo.files
            ? transformFilesToZip(projectInfo.files).then(zipped => mutate({
                files: zipped,
                description: projectInfo.description
            })) : mutate({description: projectInfo.description})
        setIsEditing(false);
    }

    useEffect(() => {
        if (isSuccess && !isPending) {
            resetField("description", {defaultValue: description});
        }
    }, [isPending, isSuccess, resetField]);

    return (
        <Box sx={{borderRadius: 20}}>
            <Stack sx={{backgroundColor: "white", borderRadius: 2}}>
                <InputController
                    control={control}
                    errors={errors}
                    name={"description"}
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