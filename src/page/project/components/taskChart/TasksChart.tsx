import { Grid2, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "./TaskCard";
import { Participant, Task } from "../../../../model/task/TasksChart";
import { StatusCard } from "./StatusCard";

const styleGrid = {
    marginY: 2,
    p: 1,
    backgroundColor: '#F4F5F7'
}

const sgrid = {
    height: '63vh',
    ml: '1vw',
    pb: '2vh',
    overflow: 'auto',
    '&::-webkit-scrollbar': { width: '1vw' },
}

interface TaskTableProps {
    notAssignedTasks: Task[]
    participants: Participant[]
    statuses: string[]
}

export const TasksChart = ({ notAssignedTasks, participants, statuses }: TaskTableProps) => {
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

    return (
        <Grid2>
            <Grid2 direction={"column"} columns={statuses.length * 2} sx={{ mx: '1vw' }}>
                <Grid2 container spacing={3} >
                    {statuses.map((_status) =>
                        <Grid2 size={12 / statuses.length} sx={styleGrid}>
                            <StatusCard status={_status} />
                        </Grid2>)}
                </Grid2>
            </Grid2>
            <Grid2 direction={"column"} columns={statuses.length * 2} sx={sgrid}>
                <Grid2>
                    {participants.map((participant) =>
                        <Grid2 container spacing={3}>
                            {statuses.map((_status) =>
                                <Grid2 size={12 / statuses.length} sx={styleGrid}>
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
                    {renderNotAssignedTasks(statuses, notAssignedTasks)}
                </Grid2>
            </Grid2>
        </Grid2>
    )
}
