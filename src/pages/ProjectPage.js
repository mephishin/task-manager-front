import React from 'react'
import {getTasks, getTaskStatuses} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";
import {useQueries} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";

export const ProjectPage = () => {
    const {project} = useParams();

    const [statusesQuery, tasksQuery] = useQueries({
        queries: [
            {
                queryKey: ['statuses'],
                queryFn: () => getTaskStatuses()
            },
            {
                queryKey: ['tasks'],
                queryFn: () => getTasks(project)
            },
        ],
    });

    if (!statusesQuery.isPending && !tasksQuery.isPending) {
        return(
            <TasksTable
                participants={tasksQuery.data.participants}
                statuses={statusesQuery.data}
                notAssignedTasks={tasksQuery.data.notAssignedTasks}
            />
        )
    } else return <CircularProgress color={"white"}/>
};