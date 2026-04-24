import {Box, CircularProgress, Grid2, Stack} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {TaskCard} from "./TaskCard";
import {Task} from "../../../../model/task/TasksChart";
import {StatusCard} from "./StatusCard";
import {useTaskStatusesGet} from "../../../../hooks/query/task/useTask";
import {useTasksChartGet} from "../../../../hooks/query/tasksChart/useTasksChart";

const styleGrid = {
    p: 1,
    backgroundColor: '#F4F5F7',
    borderRadius: 1,
}

const scrollableStack = {
    height: '86vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': {width: '0vw'},
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

    if (
        taskStatusesQuery.data
        && taskChartQuery.data
    ) {
        return <Stack gap={1}>
                <Grid2 container spacing={3}>
                    {taskStatusesQuery.data.map((_status) =>
                        <Grid2 size={12 / taskStatusesQuery.data.length} sx={styleGrid}>
                            <StatusCard status={_status}/>
                        </Grid2>)}
                </Grid2>
                <Stack gap={4} sx={scrollableStack}>
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
                    {taskChartQuery.data.notAssignedTasks.length > 0 && (
                        <Grid2 container spacing={3}>
                            {taskStatusesQuery.data?.map((_status) =>
                                <Grid2 size={12 / taskStatusesQuery.data.length} sx={styleGrid}>
                                    <Stack spacing={2}>
                                        {taskChartQuery.data.notAssignedTasks.filter((task) => task.status === _status).map((task) =>
                                            <TaskCard
                                                handleLink={handleLink}
                                                task={task}
                                            />)}
                                    </Stack>
                                </Grid2>)}
                        </Grid2>
                    )}
                </Stack>

            </Stack>
    }
};

