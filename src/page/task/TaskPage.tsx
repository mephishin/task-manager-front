import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Grid2, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useCloseTask, useTaskCommentSave, useTaskCommentsGet, useTaskGet, useTaskTypesGet, useTaskUpdate } from "../../hooks/query/task/useTask";
import { useUsersGet } from "../../hooks/query/users/useUsers";
import { UpdateTask } from "../../model/task/UpdateTask";
import { formatISORus } from "../../util/LocalInterval";
import { Comments } from "./components/Comments";
import { transformFilesToZip } from "../../util/ZIp";
import { UpdateTaskForm } from "./components/UpdateTaskForm";
import { PostComment } from "../../model/task/PostComment";


export const TaskPage = () => {
    const { key } = useParams();
    const navigate = useNavigate();

    const taskTypesQuery = useTaskTypesGet();
    const participantsQuery = useUsersGet();
    const taskQuery = useTaskGet(key);
    const updateTaskMutation = useTaskUpdate(key);
    const closeTask = useCloseTask();
    const taskComments = useTaskCommentsGet(key!)
    const postTaskComment = useTaskCommentSave(key!);

    const updateTask = (data: UpdateTask) => {
        updateTaskMutation.mutate(data)
        return taskQuery.data
    }

    const cancelTask = () => {
        closeTask.mutate({ taskKey: key })
    }

    const postComment = (comment: PostComment) => {
        comment.files
            ? transformFilesToZip(comment.files).then(zipped => postTaskComment.mutate({
                taskKey: key!,
                zippedFiles: zipped,
                text: comment.text
            })) : postTaskComment.mutate({ taskKey: key!, text: comment.text })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', overflow: 'auto' }}>
            {(
                taskTypesQuery.isFetched && taskTypesQuery.data
                && taskComments.isFetched && taskComments.data
                && participantsQuery.isFetched && participantsQuery.data
                && taskQuery.isFetched && taskQuery.data
                && key !== undefined
            ) ? (
                <Box sx={{ backgroundColor: '#F4F5F7', borderRadius: 2, maxWidth: '80%', minWidth: '50%', my: 1 }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ margin: 1 }}>
                        <ArrowBackIosNewOutlinedIcon />
                    </IconButton>
                    <Grid2 container columns={8} >
                        <Grid2 size={5}>
                            <UpdateTaskForm
                                taskKey={key}
                                types={taskTypesQuery.data}
                                participants={participantsQuery.data}
                                task={taskQuery.data}
                                updateTask={updateTask}
                            />
                        </Grid2>
                        <Grid2 container size={3} >
                            <Grid2>
                                <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5, height: '75%' }}>
                                    <Typography sx={{ margin: 5, color: "black" }}>
                                        Создана: {taskQuery.data.created}
                                    </Typography>
                                    <Typography sx={{ margin: 5, color: "black" }} >
                                        Отредактирована: {taskQuery.data.edited}
                                    </Typography>
                                    <Typography sx={{ margin: 5, color: "black" }} >
                                        Общее время работы над задачей: {formatISORus(taskQuery.data.total!)}
                                    </Typography >
                                </Stack>
                            </Grid2>
                            <Grid2>
                                <Button sx={{ backgroundColor: "white", margin: 5, borderRadius: 5, height: '25%' }} onClick={cancelTask}>
                                    Закрыть задачу
                                </Button >
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2>
                        <Comments
                            comments={taskComments.data}
                            handlePostComment={postComment}
                        />
                    </Grid2>
                </Box>
            ) : <CircularProgress color={"secondary"} />
            }
        </Box >)
}

