import React, { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import {
    Autocomplete,
    Card,
    CardContent,
    Divider,
    FormControl,
    Link,
    Stack, TextField,
    Typography
} from "@mui/material";
import {getAllProjects, getTasks, getTaskStatuses} from "../adapter/resources";

export const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setStatuses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');

    useEffect(() => {
        getTaskStatuses()
            .then(statuses => setStatuses(statuses))
            .catch(() => console.log("ERROR"));
        getAllProjects()
            .then(projects => setProjects(projects))
            .catch(() => console.log("ERROR"));
        }, []);

    useEffect(() => {
        if (project.length !== 0) {
            getTasks(project)
                .then(tasks => setTasks(tasks.tasks))
                .catch(() => console.log("ERROR"));
        }
    }, [project]);

    return (
        <Box>
            <Box>
                <FormControl sx={{minWidth: "25%", backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                    <Autocomplete
                        value={project.name}
                        onChange={(event, newValue) => setProject(newValue)}
                        disablePortal
                        options={projects.map(project => project.name)}
                        renderInput={(params) => <TextField {...params} label="project" />}
                        displayEmpty
                    >
                    </Autocomplete>
                </FormControl>
            </Box>
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