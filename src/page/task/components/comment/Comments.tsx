import {IconButton, Link, List, ListItem, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useParams} from "react-router-dom";
import {getLabel, TaskComment} from "../../../../model/task/TaskComment";
import AuthService from "../../../../AuthService";
import {EditCommentForm} from "./EditCommentForm";
import {useCommentDelete, useCommentFileDelete} from "../../../../hooks/query/comment/useComment";

const deleteButtonStyle = {
    '&:hover': {
        '& .MuiSvgIcon-root': {
            color: '#ef5350'
        }
    }
}

const commentStyle = {
    backgroundColor: "white",
    borderRadius: 5,
    width: '100%',
};

interface CommentsProps {
    comments: TaskComment[]
}

export const Comments = ({comments}: CommentsProps) => {
    const {key} = useParams();

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

    const deleteTaskComment = (commentId: string) => {
        deleteComment.mutate({commentId: commentId})

        setIsEditing('')
    };

    const isAuthUserComment = (comment: TaskComment): boolean => {
        return AuthService.getUsername() === comment.author.username
    }

    const [isEditing, setIsEditing] = useState('');

    return (
        <>
            {comments.map(comment =>
                <List sx={commentStyle}>
                    <ListItem secondaryAction={
                        <Typography
                            variant="body1"
                            sx={{color: 'text.primary', display: 'inline'}}>
                            {comment.created.toString()}
                        </Typography>}>
                        <Typography
                            variant="body1"
                            sx={{color: 'text.primary', display: 'inline'}}>
                            {getLabel(comment.author)}
                        </Typography>
                    </ListItem>
                    <ListItem sx={{minHeight: 50}} secondaryAction={
                        isAuthUserComment(comment) && <Stack>
                            <IconButton
                                onClick={() => setIsEditing(isEditing ? '' : comment.id)}
                                edge="end"
                                size="small"
                                aria-label="delete"
                                sx={{m: 0.2}}>
                                <EditIcon/>
                            </IconButton>
                            {(comment.id === isEditing) && <IconButton
                                onClick={() => deleteTaskComment(comment.id)}
                                edge="end"
                                size="small"
                                aria-label="delete"
                                sx={deleteButtonStyle}>
                                <DeleteIcon/>
                            </IconButton>}
                        </Stack>}>

                        <ListItemText sx={{color: "black"}}>
                            <EditCommentForm
                                comment={comment}
                                editable={isEditing === comment.id}
                                setIsEditing={setIsEditing}/>
                        </ListItemText>)
                    </ListItem>
                    {comment.files.length > 0 &&
                        <List>
                            {comment.files.map(file =>
                                <ListItem sx={{minWidth: 200, maxWidth: 250}} secondaryAction={
                                    isAuthUserComment(comment)
                                    && comment.id === isEditing
                                    && <IconButton
                                        edge="start"
                                        onClick={() => deleteCommentFile.mutate(
                                            {commentId: comment.id, filename: file.name})}
                                        aria-label="delete"
                                        sx={deleteButtonStyle}>
                                        <DeleteIcon/>
                                    </IconButton>}>
                                    <ListItemText>
                                        <Link align="left" component="button" sx={{lineHeight: '10px'}}
                                              onClick={() => downloadCommentFile(file)}>
                                            <Typography color="primary">
                                                {file.name}
                                            </Typography>
                                        </Link>
                                    </ListItemText>
                                </ListItem>)}
                        </List>}
                </List>)}
        </>
    )
}
