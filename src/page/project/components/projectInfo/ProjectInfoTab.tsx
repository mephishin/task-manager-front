import {Box, Grid2, IconButton, Link, List, ListItem, ListItemIcon, Stack, styled, Typography} from "@mui/material";
import React, {useState} from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {useProjectFileDelete, useProjectFilesGet, useProjectGetById} from "../../../../hooks/query/project/useProject";
import {EditProjectInfoForm} from "./EditProjectInfoForm";
import EditIcon from "@mui/icons-material/Edit";
import {useAuth} from "../../../../AuthProvider";

interface ProjectInfoPageProps {
    projectId: string
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const readOnlyTextFieldStyle = {
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused': {
            '& fieldset': {
                borderColor: 'grey.400',
                borderWidth: '1px',
            },
            '&:not(.Mui-error)': {
                boxShadow: 'none',
            },
        },
    },
    '& label.Mui-focused': {
        color: '#656565',
    },
}

const readOnlyTextFieldSlotProps = {
    input: {
        readOnly: true,
    }
};

const typographyStyle = {
    color: '#656565'
};

export const ProjectInfoTab = ({projectId}: ProjectInfoPageProps) => {
    const getProjectFiles = useProjectFilesGet(projectId);
    const getProjectById = useProjectGetById(projectId);
    const deleteProjectFile = useProjectFileDelete();

    const {hasRole, LEADER} = useAuth();

    const handleDownloadFile = (file: File) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteFile = (file: File) => {
        deleteProjectFile.mutate({
            filename: file.name,
            projectId: projectId
        })
    };

    const [isEditing, setIsEditing] = useState(false);

    if (getProjectById.data && getProjectFiles.data) {
        return (
            <Stack sx={{backgroundColor: '#F4F5F7', p: 2, borderRadius: 1, gap: 2}}>
                <Box sx={{borderRadius: 1, backgroundColor: "white", p: 1}}>
                    <Typography sx={typographyStyle} variant="h6">
                        Устав проекта "{getProjectById.data.name}"
                    </Typography>
                </Box>
                <Grid2 container columns={20} sx={{borderRadius: 1, backgroundColor: "white", p: 2}}>
                    <Grid2 size={19}>
                        <EditProjectInfoForm editable={isEditing} description={getProjectById.data.description}
                                             setIsEditing={setIsEditing} projectId={projectId}/>
                    </Grid2>
                    {hasRole(LEADER) && <Grid2 container sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1
                    }} size={1}>
                        <IconButton
                            onClick={() => setIsEditing(!isEditing)}
                            size="small">
                            <EditIcon/>
                        </IconButton>
                    </Grid2>}
                </Grid2>
                <Box sx={{borderRadius: 1, backgroundColor: "white"}}>
                    {getProjectFiles.data?.length ? (
                        <List>
                            {getProjectFiles.data?.map((file) => (
                                <ListItem key={file.name} secondaryAction={
                                    hasRole(LEADER) && (
                                        <IconButton edge="end" aria-label="delete" onClick={() => {
                                            handleDeleteFile(file)
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>)
                                }>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Link component="button"
                                              variant="body2"
                                              onClick={() => handleDownloadFile(file)}>
                                            <Typography color="primary">
                                                {file.name}
                                            </Typography>
                                        </Link>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography sx={{p: 1}} color="text.secondary" align="center">
                            Файлы отсутствуют
                        </Typography>
                    )}
                </Box>
            </Stack>
        )
    }
}
