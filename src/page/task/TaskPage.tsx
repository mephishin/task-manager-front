import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Box, CircularProgress, Grid2, IconButton, List, Stack, TextField, Typography} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useTaskGet, useTaskTypesGet, useTaskUpdate} from "../../hooks/query/task/useTask";
import {useUsersGet} from "../../hooks/query/users/useUsers";
import {formatISORus} from "../../util/LocalInterval";
import {UpdateTask} from "./components/updateTask/UpdateTaskFormScheme";
import {UpdateTaskForm} from "./components/updateTask/UpdateTaskForm";
import {Comments} from "./components/comment/Comments";
import {useTaskCommentsGet} from "../../hooks/query/comment/useComment";
import {PostCommentForm} from "./components/comment/PostCommentForm";

const readOnlyTextFieldStyle = {
    m: 5,
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

const typographyStyle = {
    m: 2, color: '#656565'
};

const readOnlyTextFieldSlotProps = {
    input: {
        readOnly: true,
    }
};

const gridElemStyle = {
    backgroundColor: "white",
    borderRadius: 1,
};

const boxStyle = {
    backgroundColor: '#F4F5F7',
    borderRadius: 1,
    my: 1,
    p: 2,
    mx: '15vw'
};

const commentSectionStyle = {
    p: 0,
    gap: 1,
    display: 'flex',
    flexDirection: 'column'
};

const mainBoxStyle = {
    height: '100%', overflow: 'auto'
};

export const TaskPage = () => {
    const {key} = useParams();
    const navigate = useNavigate();

    const participantsQuery = useUsersGet();
    const taskQuery = useTaskGet(key);
    const updateTaskMutation = useTaskUpdate(key);
    const taskComments = useTaskCommentsGet(key!)

    const updateTask = (data: UpdateTask) => {
        updateTaskMutation.mutate({
            key: data.key,
            name: data.name,
            assignee: data.assignee.id,
            description: data.description,
        })
        return taskQuery.data
    }

    return (<Box sx={mainBoxStyle}>
        {(participantsQuery.isFetched && participantsQuery.data
            && taskQuery.isFetched && taskQuery.data
        ) ? (
            <Box sx={boxStyle}>
                <Grid2 container spacing={2}>
                    <Grid2>
                        <IconButton onClick={() => navigate(-1)} sx={{margin: 1}}>
                            <ArrowBackIosNewOutlinedIcon/>
                        </IconButton>
                    </Grid2>
                    <Grid2 container size={12} sx={gridElemStyle}>
                        <TextField label={"Ключ задачи"} slotProps={readOnlyTextFieldSlotProps}
                                   sx={readOnlyTextFieldStyle}
                                   focused defaultValue={taskQuery.data.key}></TextField>
                    </Grid2>
                    <Grid2 size={7} sx={gridElemStyle}>
                        <UpdateTaskForm
                            taskKey={key!}
                            participants={participantsQuery.data}
                            task={taskQuery.data}
                            updateTask={updateTask}
                        />
                    </Grid2>
                    <Grid2 size={5} sx={gridElemStyle}>
                        <Stack>
                            <TextField label={"Создана"} slotProps={readOnlyTextFieldSlotProps} sx={readOnlyTextFieldStyle}
                                       focused defaultValue={taskQuery.data.created}></TextField>
                            <TextField label={"Отредактирована"} slotProps={readOnlyTextFieldSlotProps}
                                       sx={readOnlyTextFieldStyle} focused
                                       defaultValue={taskQuery.data.edited}></TextField>
                            <TextField label={"Общее время работы над задачей"} slotProps={readOnlyTextFieldSlotProps}
                                       sx={readOnlyTextFieldStyle} focused
                                       defaultValue={formatISORus(taskQuery.data.total!)}></TextField>
                        </Stack>
                    </Grid2>
                    <Grid2 size={12} sx={gridElemStyle}>
                        <Typography sx={typographyStyle} variant="h6">
                            Комментарии
                        </Typography>
                    </Grid2>
                    {(taskComments.isFetched && taskComments.data) ? (<Grid2 size={12}>
                        <List sx={commentSectionStyle}>
                            <Comments comments={taskComments.data}/>
                        </List>
                    </Grid2>) : <CircularProgress color={"secondary"}/>}
                    <Grid2 size={12} sx={gridElemStyle}>
                        <PostCommentForm/>
                    </Grid2>
                </Grid2>
            </Box>
        ) : <CircularProgress color={"secondary"}/>}
    </Box>)
}

