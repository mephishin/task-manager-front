import React from "react";
import {Box, CircularProgress, Grid2, IconButton, List, Stack, TextField, Typography} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useTaskGet} from "../../hooks/query/task/useTask";
import {formatISORus} from "../../util/LocalInterval";
import {UpdateTaskForm} from "./components/updateTask/UpdateTaskForm";
import {Comments} from "./components/comment/Comments";
import {useTaskCommentsGet} from "../../hooks/query/comment/useComment";
import {PostCommentForm} from "./components/comment/PostCommentForm";
import {useNavigate} from "@tanstack/react-router";

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

export const TaskPage = (taskKey: string) => {
    const {data: task} = useTaskGet(taskKey);
    const taskComments = useTaskCommentsGet(taskKey)
    const navigate = useNavigate();

    return (<Box sx={mainBoxStyle}>
        <Box sx={boxStyle}>
            <Grid2 container spacing={2}>
                <Grid2>
                    <IconButton onClick={() => { // @ts-ignore
                        navigate({to: `/project/${task?.project.id}`})
                    }} sx={{margin: 1}}>
                        <ArrowBackIosNewOutlinedIcon/>
                    </IconButton>
                </Grid2>
                <Grid2 container size={12} sx={gridElemStyle}>
                    <TextField label={"Ключ задачи"} slotProps={readOnlyTextFieldSlotProps}
                               sx={readOnlyTextFieldStyle}
                               focused defaultValue={taskKey}></TextField>
                </Grid2>
                <Grid2 size={7} sx={gridElemStyle}>
                    <UpdateTaskForm taskKey={taskKey}/>
                </Grid2>
                <Grid2 size={5} sx={gridElemStyle}>
                    <Stack>
                        <TextField label={"Создана"} slotProps={readOnlyTextFieldSlotProps} sx={readOnlyTextFieldStyle}
                                   focused defaultValue={task?.created}></TextField>
                        <TextField label={"Отредактирована"} slotProps={readOnlyTextFieldSlotProps}
                                   sx={readOnlyTextFieldStyle} focused
                                   defaultValue={task?.edited}></TextField>
                        <TextField label={"Общее время работы над задачей"} slotProps={readOnlyTextFieldSlotProps}
                                   sx={readOnlyTextFieldStyle} focused
                                   defaultValue={task ? formatISORus(task?.total) : ""}></TextField>
                    </Stack>
                </Grid2>
                <Grid2 size={12} sx={gridElemStyle}>
                    <Typography sx={typographyStyle} variant="h6">
                        Комментарии
                    </Typography>
                </Grid2>
                {(taskComments.isFetched && taskComments.data) ? (<Grid2 size={12}>
                    <List sx={commentSectionStyle}>
                        <Comments taskKey={taskKey} comments={taskComments.data}/>
                    </List>
                </Grid2>) : <CircularProgress color={"secondary"}/>}
                <Grid2 size={12} sx={gridElemStyle}>
                    <PostCommentForm taskKey={taskKey}/>
                </Grid2>
            </Grid2>
        </Box>
    </Box>)
}

