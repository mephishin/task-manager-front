import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UpdateTaskForm} from "../components/forms/UpdateTaskForm";
import {CircularProgress, Grid2, IconButton, Stack} from "@mui/material";
import {UpdateTask} from "../model/task/Task";
import {useCloseTask, useTaskGet, useTaskStatusesGet, useTaskTypesGet, useTaskUpdate} from "../hooks/query/task/useTask";
import {useParticipantsGet} from "../hooks/query/participant/useParticipant";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

export const TaskPage = () => {
    const {key} = useParams();
    const navigate = useNavigate();

    const taskTypesQuery = useTaskTypesGet();
    const participantsQuery = useParticipantsGet();
    const taskQuery = useTaskGet(key);
    const updateTaskMutation = useTaskUpdate(key);
    const closeTask = useCloseTask();

    const updateTask = (data: UpdateTask) => {
        updateTaskMutation.mutate(data)
        return taskQuery.data
    }

    const cancelTask = () => {
        closeTask.mutate({taskKey: key})
    }

    if (
        !taskTypesQuery.isPending
        && !participantsQuery.isPending
        && !taskQuery.isPending
    ) {
        return (
            <Box sx={{backgroundColor: '#F4F5F7', borderRadius: 2}}>
                <IconButton onClick={() => navigate(-1)} sx={{margin: 1}}>
                    <ArrowBackIosNewOutlinedIcon/>
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
                    <Grid2 size={3}>
                        <Stack>
                            <Box sx={{borderRadius: 20}}>
                                <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                                    <Typography sx={{margin: 5, color:"black"}}>
                                        Created: {taskQuery.data?.created}
                                    </Typography>
                                    <Typography sx={{margin: 5, color:"black"}} >
                                        Edited: {taskQuery.data?.edited}
                                    </Typography>
                                    <Typography sx={{margin: 5, color:"black"}} >
                                        Total: {taskQuery.data?.total}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box sx={{borderRadius: 20}}>
                                <Stack sx={{backgroundColor: "white", margin: 5, borderRadius: 5}}>
                                    <Button onClick={cancelTask}>
                                        Close task
                                    </Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid2>
                </Grid2>
            </Box>
        )
    } else return <CircularProgress color={"secondary"}/>
}