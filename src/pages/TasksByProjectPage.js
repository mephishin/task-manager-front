import React, { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import {
    Card,
    CardContent,
    Divider,
    Link,
    Stack,
    Typography
} from "@mui/material";
import {getTasks, getTaskStatuses} from "../adapter/resources";
import {useParams} from "react-router-dom";

export const TasksByProjectPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setStatuses] = useState([]);
    const {project} = useParams();

    useEffect(() => {
        getTaskStatuses()
            .then(statuses => setStatuses(statuses))
            .catch(() => console.log("ERROR"));
        }, []);

    useEffect(() => {
        getTasks(project)
            .then(tasks => setTasks(tasks.tasks))
            .catch(() => console.log("ERROR"));
    }, [project]);

    return (
        <Box>
            <Box>
                <Stack
                    sx={{borderRadius: 2, margin: 2, padding: 2}}
                    direction={"row"}
                    divider={<Divider orientation={"vertical"}/>}
                    spacing={2}
                    flexGrow={1}
                >
                    {taskStatuses.map((status) => (
                        <Stack
                            direction={"column"}
                            divider={<Divider orientation={"horizontal"}/>}
                            spacing={2}
                            flexGrow={1}
                        >
                            <Card sx={{ borderRadius: 3}}>
                                <CardContent>
                                    <Typography align={"center"} sx={{ minWidth: 85, borderRadius: 2}} >
                                        {status.value}
                                    </Typography>
                                </CardContent>
                            </Card>
                            {tasks.filter(task => task.status === status.value).map((task) => (
                                <Card>
                                    <CardContent>
                                        <Link href={window.location.href + "/" + task.key} underline="hover">
                                            {task.key}
                                        </Link>
                                        <Typography>
                                            {task.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};