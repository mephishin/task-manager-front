import { Avatar, Button, CircularProgress, Grid2, IconButton, Link, List, ListItem, ListItemAvatar, ListItemIcon, Stack, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Project } from "../../model/project/Project";
import { useProjectFileSave, useProjectsFilesGet } from "../../hooks/query/project/useProject";
import { ProjectFile } from "../../model/project/ProjectFile";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import mime from "mime";


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

export const ProjectInfoBar = ({ project }: ProjectInfoBarProps) => {
    const projectFiles = useProjectsFilesGet(project);
    const projectFile = useProjectFileSave();

    const handleUpload = (event: any) => {
        projectFile.mutate({
            file: event.target.files[0],
            projectId: project.key
        });
    }

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const downloadFile = (file: File) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!projectFiles.isPending) {
        return (
            <Stack sx={{ backgroundColor: '#F4F5F7', display: 'flex', p: 1, m: 1, borderRadius: 2 }}>
                <Typography variant="h6" component="div" color="primary">
                    Устав проекта
                </Typography>
                <Demo>
                    <List>
                        {projectFiles.data?.map(file => (
                            <ListItem secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Link component="button"
                                        variant="body2"
                                        onClick={() => downloadFile(file)}>
                                        <Typography color="primary">
                                            {file.name}
                                        </Typography>
                                    </Link>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Demo>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => handleUpload(event)}
                        multiple
                    />
                </Button>
            </Stack>
        )
    } else return <CircularProgress color={"warning"} />
}
