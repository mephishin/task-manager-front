import {Card, CardContent, Grid2, Link, Stack, Typography} from "@mui/material";
import React from "react";

export const TasksTable = (props) => {
    const {participants, statuses} = props;

    return (
        <Grid2 direction={"column"} columns={statuses.length * 2} spacing={2}>
            <Grid2 container spacing={2}>
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
                <Grid2 container spacing={2}>
                    {statuses.map((_status) => (
                        <Grid2 size={2}>
                            <Stack spacing={2} sx={{marginY: 5}}>
                                {participant.tasks.filter((task) => task.status === _status.value).map((task) => (
                                    <Card sx={{marginY: 5}}>
                                        <CardContent>
                                            <Link href={window.location.href + "/" + task.key} underline="hover">
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
        </Grid2>
    )
}
