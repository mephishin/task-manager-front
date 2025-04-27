import React from "react";
import {useParams} from "react-router-dom";
import {UpdateTaskForm} from "../components/forms/UpdateTaskForm";
import {CircularProgress} from "@mui/material";
import {UpdateTask} from "../model/task/Task";
import {useTaskGet, useTaskStatusesGet, useTaskTypesGet, useTaskUpdate} from "../hooks/useTask";
import {useParticipantsGet} from "../hooks/useParticipant";

export const TaskPage = () => {
    const {key} = useParams();

    const taskTypesQuery = useTaskTypesGet();
    const taskStatusesQuery = useTaskStatusesGet();
    const participantsQuery = useParticipantsGet();
    const taskQuery = useTaskGet(key);
    const updateTaskMutation = useTaskUpdate();

    const updateTask = (data: UpdateTask) => {
        updateTaskMutation.mutate(data)
        return taskQuery.data
    }

    if (
        !taskTypesQuery.isPending
        && !taskStatusesQuery.isPending
        && !participantsQuery.isPending
        && !taskQuery.isPending
    ) {
        return (
            <UpdateTaskForm
                taskKey={key}
                types={taskTypesQuery.data}
                participants={participantsQuery.data}
                statuses={taskStatusesQuery.data}
                task={taskQuery.data}
                updateTask={updateTask}
            />
        )
    } else return <CircularProgress color={"secondary"}/>
}