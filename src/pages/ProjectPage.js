import React from 'react'
import {getTasks, getTasksByAuthParticipant, getTaskStatuses} from "../adapter/resources";
import {useOutletContext} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";
import {useQueries} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";

export const ProjectPage = () => {
    const project = useOutletContext();

    const [statusesQuery, tasksQuery] = useQueries({
        queries: [
            {
                queryKey: ['statuses'],
                queryFn: () => getTaskStatuses()
            },
            {
                queryKey: ['tasks', project],
                queryFn: () => project ? getTasks(project) : getTasksByAuthParticipant()
            }
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