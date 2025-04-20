import {Card, CardContent, Grid2, Link, Stack, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";

export const TasksTable = (props) => {
    const {notAssignedTasks, participants, statuses} = props;
    const navigate = useNavigate();

    const handleLink = (task) => {
        navigate(`/task/${task.key}`)
    }

    return (
        <Box >
            <Grid2 direction={"column"} columns={statuses.length * 2} style={{maxHeight: '92vh', overflow: 'auto'}}>
                <Grid2 container spacing={3}>
                    {statuses.map((_status) => (
                        <Grid2 size={2}>
                            <Card sx={{ borderRadius: 3}}>
                                <CardContent>
                                    <Typography align={"center"} sx={{ minWidth: 85, borderRadius: 2}} >
                                        {_status.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
                {participants.map((participant) => (
                    <Grid2 container spacing={3}>
                        {statuses.map((_status) => (
                            <Grid2 size={2}>
                                <Stack spacing={2} sx={{marginY: 2}}>
                                    {participant.tasks.filter((task) => task.status === _status.value).map((task) => (
                                        <Card>
                                            <CardContent>
                                                <Link onClick={() => handleLink(task)} underline="hover">
                                                    {task.key}
                                                </Link>
                                                <Typography>
                                                    {task.name}
                                                </Typography>
                                                <Typography>
                                                    Assigned: {participant.username}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Stack>
                            </Grid2>
                        ))}
                    </Grid2>
                ))}
                <Grid2 container spacing={3}>
                    {statuses.map((_status) => (
                        <Grid2 size={2}>
                            <Stack spacing={2} sx={{marginY: 2}}>
                                {notAssignedTasks.filter((task) => task.status === _status.value).map((task) => (
                                    <Card>
                                        <CardContent>
                                            <Link onClick={() => handleLink(task)} underline="hover">
                                                {task.key}
                                            </Link>
                                            <Typography>
                                                {task.name}
                                            </Typography>
                                            <Typography>
                                                Not assigned
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        </Grid2>
                    ))}
                </Grid2>
            </Grid2>
        </Box>
    )
}
