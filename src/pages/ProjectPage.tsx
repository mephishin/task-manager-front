import React from 'react'
import {useOutletContext} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";
import {CircularProgress} from "@mui/material";
import {useTasksGet, useTaskStatusesGet} from "../hooks/useTask";

export const ProjectPage = () => {
    const project: string = useOutletContext();

    const taskStatusesQuery = useTaskStatusesGet();
    const tasksQuery = useTasksGet(project);

    if (!taskStatusesQuery.isPending && !tasksQuery.isPending) {
        return(
            <TasksTable
                participants={tasksQuery?.data?.participants}
                statuses={taskStatusesQuery?.data}
                notAssignedTasks={tasksQuery?.data?.notAssignedTasks}
            />
        )
    } else return <CircularProgress color={"warning"}/>
};