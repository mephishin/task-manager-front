import { IconButton, Link, List, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskComment } from "../../../model/task/TaskComment";
import { PostCommentForm } from "./PostCommentForm";
import { PostComment } from "../../../model/task/PostComment";
import { useCommentDelete, useCommentFileDelete } from "../../../hooks/query/task/useTask";
import { useParams } from "react-router-dom";
import AuthService from "../../../AuthService";

const deleteButtonStyle = {
    '&:hover': {
        '& .MuiSvgIcon-root': {
            color: '#ef5350'
        }
    }
}

interface CommentsProps {
    comments: TaskComment[]
    handlePostComment: (comment: PostComment) => void
}

export const Comments = ({ comments, handlePostComment }: CommentsProps) => {
    const { key } = useParams();

    const deleteCommentFile = useCommentFileDelete(key!)
    const deleteComment = useCommentDelete(key!)

    const downloadCommentFile = (file: File) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isAuthUserComment = (comment: TaskComment): boolean => {
        return AuthService.getUsername() == comment.author.username
    }

    return (
        <Stack sx={{ display: 'flex', backgroundColor: '#F4F5F7', px: 2, py: 1, borderRadius: 2 }}>
            <Typography variant="h6" color="primary">
                Комментарии
            </Typography>
            <List>
                {comments.map(comment =>
                    <ListItem sx={{ backgroundColor: "white", my: 2, borderRadius: 2 }} alignItems="flex-start" >
                        <Stack sx={{ width: '100%' }}>
                            <ListItem sx={{ py: 1 }} secondaryAction={
                                isAuthUserComment(comment) && <IconButton
                                    onClick={() => deleteComment.mutate({ commentId: comment.id })}
                                    edge="end"
                                    aria-label="delete"
                                    sx={deleteButtonStyle}>
                                    <DeleteIcon />
                                </IconButton>
                            }>
                                <ListItemText sx={{ color: "black" }}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.primary', display: 'inline' }}
                                            >
                                                {comment.text}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                >
                                    <ListItem disableGutters secondaryAction={<Typography
                                        variant="body1"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        {comment.created.toString()}
                                    </Typography>}>
                                        <Typography
                                            variant="body1"
                                            sx={{ color: 'text.primary', display: 'inline', }}
                                        >
                                            {comment.author.username}
                                        </Typography>
                                    </ListItem>

                                </ListItemText>
                            </ListItem>
                            {comment.files.length > 0 &&
                                <ListItem>
                                    <Stack>
                                        {comment.files.map(file =>
                                            <ListItem sx={{ maxWidth: 300 }} secondaryAction={
                                                isAuthUserComment(comment) && <IconButton
                                                    edge="end"
                                                    onClick={() => deleteCommentFile.mutate(
                                                        { commentId: comment.id, filename: file.name })}
                                                    aria-label="delete"
                                                    sx={deleteButtonStyle}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }>
                                                <ListItemText>
                                                    <Link align="left" component="button" sx={{ lineHeight: '10px' }}
                                                        onClick={() => downloadCommentFile(file)}>
                                                        <Typography color="primary" variant="caption">
                                                            {file.name}
                                                        </Typography>
                                                    </Link>
                                                </ListItemText>
                                            </ListItem>)}
                                    </Stack>
                                </ListItem>}
                        </Stack>
                    </ListItem>)}
                <PostCommentForm postCommentHandler={handlePostComment} />
            </List>
        </Stack>
    )
}
