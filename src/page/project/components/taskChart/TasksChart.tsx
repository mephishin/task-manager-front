import { CircularProgress, Grid2, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "./TaskCard";
import { Task } from "../../../../model/task/TasksChart";
import { StatusCard } from "./StatusCard";
import { useTaskStatusesGet } from "../../../../hooks/query/task/useTask";
import { useTasksChartGet } from "../../../../hooks/query/tasksChart/useTasksChart";

const styleGrid = {
    marginY: 2,
    p: 1,
    backgroundColor: '#F4F5F7'
}

const sgrid = {
    height: '86vh',
    mx: '1vw',
    pb: '2vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': { width: '0vw' },
}

interface TaskTableProps {
    projectId: string
}

export const TasksChart = ({projectId}: TaskTableProps) => {
    const taskStatusesQuery = useTaskStatusesGet(projectId);
    const taskChartQuery = useTasksChartGet(projectId);

    const navigate = useNavigate();

    const handleLink = (task: Task) => {
        navigate(`/task/${task.key}`)
    }

    const renderNotAssignedTasks = (statuses: String[], notAssignedTasks: Task[]) => {
        if (notAssignedTasks.length > 0) {
            return (
                <Grid2 spacing={3}>
                    {statuses?.map((_status) =>
                        <Grid2 size={12 / statuses.length} sx={styleGrid}>
                            <Stack spacing={2}>
                                {notAssignedTasks.filter((task) => task.status === _status).map((task) =>
                                    <TaskCard
                                        handleLink={handleLink}
                                        task={task}
                                    />)}
                            </Stack>
                        </Grid2>)}
                </Grid2>
            )
        }
    }

    if (
        taskStatusesQuery.data
        && taskChartQuery.data
    ) {
        return <Grid2>
            <Grid2 direction={"column"} columns={taskStatusesQuery.data.length * 2} sx={{ mx: '1vw', height: '6vh'}}>
                <Grid2 container spacing={3} >
                    {taskStatusesQuery.data.map((_status) =>
                        <Grid2 size={12 / taskStatusesQuery.data.length} sx={styleGrid}>
                            <StatusCard status={_status} />
                        </Grid2>)}
                </Grid2>
            </Grid2>
            <Grid2 direction={"column"} columns={taskStatusesQuery.data.length * 2} sx={sgrid}>
                <Grid2>
                    {taskChartQuery.data.participants.map((participant) =>
                        <Grid2 container spacing={3}>
                            {taskStatusesQuery.data.map((_status) =>
                                <Grid2 size={12 / taskStatusesQuery.data.length} sx={styleGrid}>
                                    <Stack spacing={2}>
                                        {participant.tasks.filter((task) => task.status === _status).map((task) =>
                                            <TaskCard
                                                handleLink={handleLink}
                                                task={task}
                                                participant={participant}
                                            />
                                        )}
                                    </Stack>
                                </Grid2>
                            )}
                        </Grid2>)}
                    {renderNotAssignedTasks(taskStatusesQuery.data, taskChartQuery.data.notAssignedTasks)}
                </Grid2>
            </Grid2>
        </Grid2>

    } else if (
        taskStatusesQuery.isPending
        && taskChartQuery.isPending
    ) {
        return <CircularProgress color={"warning"} />
    }
};

