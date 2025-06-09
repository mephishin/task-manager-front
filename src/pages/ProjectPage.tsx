import React from 'react'
import {useOutletContext} from "react-router-dom";
import {TasksChart} from "../components/project/TasksChart";
import {Box, CircularProgress} from "@mui/material";
import {useTaskStatusesGet} from "../hooks/query/task/useTask";
import {Project} from "../model/project/Project";
import {useTasksChartGet} from "../hooks/query/tasksChart/useTasksChart";
import {PeriodBar} from "../components/period/PeriodBar";

export const ProjectPage = () => {
    const project: Project = useOutletContext();

    const taskStatusesQuery = useTaskStatusesGet();
    const tasksQuery = useTasksChartGet(project);

    if (!taskStatusesQuery.isPending && !tasksQuery.isPending) {
        return(
            <Box sx={{backgroundColor: 'white'}}>
                <PeriodBar project={project}/>
                <TasksChart
                    participants={tasksQuery?.data?.participants}
                    statuses={taskStatusesQuery?.data}
                    notAssignedTasks={tasksQuery?.data?.notAssignedTasks}
                />
            </Box>
        )
    } else return <CircularProgress color={"warning"}/>
};