import { Button, CircularProgress, IconButton, Link, List, ListItem, ListItemIcon, Stack, styled, Typography } from "@mui/material";
import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthService from "../../../AuthService";
import { TaskComment } from "../../../model/task/TaskComment";

interface CommentsProps {
    comments: TaskComment[]
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

export const Comments = ({ comments }: CommentsProps) => {
    //     const handleUpload = (event: any) => {
    //         saveProjectFile.mutate({
    //             file: event.target.files[0],
    //             projectId: project.key
    //         });
    //     }
    //
    //     const handleDownloadFile = (file: File) => {
    //         const link = document.createElement('a');
    //         link.href = URL.createObjectURL(file);
    //         link.download = file.name;
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     };
    //
    //     const handleDeleteFile = (file: File) => {
    //         deleteProjectFile.mutate({
    //             filename: file.name,
    //             projectId: project.key
    //         })
    //     };
    return (
        <Stack sx={{ backgroundColor: '#F4F5F7', p: 1, borderRadius: 2 }}>
            <Typography variant="h6" component="div" color="primary">
                Комментарии
            </Typography>
            <Demo>
                {comments.length > 0 ? (
                    <List sx={{ p: 1 }} >
                        {comments.map(comment => (
                            <ListItem key={comment.id} sx={{ backgroundColor: '#F4F5F7', my: 1 }} secondaryAction={
                                <IconButton edge="end" aria-label="delete" >
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography color="primary">
                                        {comment.text}
                                    </Typography>
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
            <Button

                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ my: 1 }}
            >
                Загрузить файл
                <VisuallyHiddenInput
                    type="file"
                    multiple
                />
            </Button>
        </Stack>
    )
}
