import React from 'react'
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useTaskStatusesGet } from '../../hooks/query/task/useTask';
import { useTasksChartGet } from '../../hooks/query/tasksChart/useTasksChart';
import { ProjectInfoBar } from './components/ProjectInfoBar';
import { PeriodBar } from './components/PeriodBar';
import { TasksChart } from './components/taskChart/TasksChart';



export const ProjectPage = () => {
    const { projectId } = useParams();

    const taskStatusesQuery = useTaskStatusesGet(projectId);
    const taskChartQuery = useTasksChartGet(projectId);

    if (
        taskStatusesQuery.data
        && taskChartQuery.data
    ) {
        return <Box sx={{ backgroundColor: 'white' }}>
            <ProjectInfoBar projectId={projectId!} />
            <PeriodBar projectId={projectId!} />
            <TasksChart
                participants={taskChartQuery.data.participants}
                statuses={taskStatusesQuery.data}
                notAssignedTasks={taskChartQuery.data.notAssignedTasks}
            />
        </Box>

    } else if (
        taskStatusesQuery.isPending
        && taskChartQuery.isPending
    ) {
        return <CircularProgress color={"warning"} />
    }
};