import React from 'react'
import {getTasksByAuthParticipant, getTaskStatuses} from "../adapter/resources";
import {TasksTable} from "../components/tasks/TasksTable";
import {useQueries} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";

export const MyProjectPage = () => {
    const [statusesQuery, tasksByAuthQuery] = useQueries({
        queries: [
            {
                queryKey: ['statuses'],
                queryFn: () => getTaskStatuses()
            },
            {
                queryKey: ['tasksByAuth'],
                queryFn: () => getTasksByAuthParticipant()
            },
        ],
    });

    if (!statusesQuery.isPending && !tasksByAuthQuery.isPending) {
        return(
            <TasksTable
                notAssignedTasks={tasksByAuthQuery.data.notAssignedTasks}
                statuses={statusesQuery.data}
                participants={tasksByAuthQuery.data.participants}
            />
        )
    } else return <CircularProgress color={"white"}/>
};

