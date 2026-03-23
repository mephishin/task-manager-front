import {Button, CircularProgress, IconButton, Link, List, ListItem, ListItemIcon, Stack, styled, Typography } from "@mui/material";
import React from "react";
import { Project } from "../../model/project/Project";
import { useProjectFileDelete, useProjectFileSave, useProjectsFilesGet } from "../../hooks/query/project/useProject";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthService from "../../AuthService";

interface ProjectInfoBarProps {
    project: Project
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

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
    const getProjectFiles = useProjectsFilesGet(project);
    const saveProjectFile = useProjectFileSave();
    const deleteProjectFile = useProjectFileDelete();

    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)

    const handleUpload = (event: any) => {
        saveProjectFile.mutate({
            file: event.target.files[0],
            projectId: project.key
        });
    }

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
            projectId: project.key
        })
    };

    if (!getProjectFiles.isPending && getProjectFiles.data) {
        return (
            <Stack sx={{ backgroundColor: '#F4F5F7', display: 'flex', p: 1, m: 1, borderRadius: 2 }}>
                <Typography variant="h6" component="div" color="primary">
                    Устав проекта
                </Typography>
                <Demo sx={{ borderRadius: 2 }}>
                    {getProjectFiles.data?.length ? (
                        <List>
                            {getProjectFiles.data?.map(file => (
                                <ListItem secondaryAction={
                                    isLeader && (
                                        <IconButton edge="end" aria-label="delete" onClick={() => { handleDeleteFile(file) }} >
                                            <DeleteIcon />
                                        </IconButton>)
                                }>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon />
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
                        <Typography sx={{ p: 1 }} color="text.secondary" align="center">
                            Файлы отсутствуют
                        </Typography>
                    )}
                </Demo>
                {isLeader && (
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{my:1}}
                    >
                        Загрузить файл
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => handleUpload(event)}
                            multiple
                        />
                    </Button>
                )}
            </Stack>
        )
    } else return <CircularProgress color={"warning"} />
}
