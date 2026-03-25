import { Box, Button, CircularProgress, IconButton, Link, List, ListItem, ListItemIcon, Stack, styled, Typography } from "@mui/material";
import React from "react";

import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';
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

const deleteButtonStyle = {
    '&:hover': {
        '& .MuiSvgIcon-root': {
            color: '#ef5350'
        }
    }
}

export const Comments = ({ comments }: CommentsProps) => {
        const handleDownloadFile = (file: File) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    //
    //     const handleDeleteFile = (file: File) => {
    //         deleteProjectFile.mutate({
    //             filename: file.name,
    //             projectId: project.key
    //         })
    //     };

    return (
        <Stack sx={{ display: 'flex', backgroundColor: '#F4F5F7', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" component="div" color="primary">
                Комментарии
            </Typography>
            <List sx={{ width: '100%' }}>
                {comments.map(comment =>
                    <ListItem sx={{ backgroundColor: "white", my: 2, borderRadius: 2 }} alignItems="flex-start" >
                        <Stack>
                            <ListItem secondaryAction={
                                <IconButton edge="end" aria-label="delete" sx={deleteButtonStyle}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText sx={{ color: "black" }}
                                    primary={comment.author.username}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="primary"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {comment.text}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {comment.files.length > 0 &&
                                <ListItem>
                                    <List>
                                        {comment.files.map(file =>
                                            <ListItem secondaryAction={
                                                <IconButton edge="end" aria-label="delete" sx={deleteButtonStyle}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                                <ListItemText>
                                                    <Link component="button"
                                                        variant="body2"
                                                        onClick={() => handleDownloadFile(file)}>
                                                        <Typography color="primary">
                                                            {file.name}
                                                        </Typography>
                                                    </Link>
                                                </ListItemText>
                                            </ListItem>)}
                                    </List>
                                </ListItem>
                            }
                        </Stack>

                    </ListItem>
                )}
            </List>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<AddCommentIcon />}
                sx={{ my: 1 }}
            >
                Добавить комментарий
                <VisuallyHiddenInput
                    type="file"
                    multiple
                />
            </Button>
        </Stack>
    )
}
