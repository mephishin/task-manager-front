import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import {
    Card,
    CardContent,
    Divider,
    FormControl,
    Link, Select,
    Stack,
    Typography
} from "@mui/material";
import {getAllProjects, getTasks, getTaskStatuses} from "../../adapter/adapter";
import MenuItem from "@mui/material/MenuItem";

export const Tasks = () => {
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

    const handleChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <Box>
            <Box>
                <FormControl sx={{minWidth: 120, backgroundColor: "white", borderRadius: 2, margin: 2, padding: 2}}>
                    <Typography color="black">Choose project</Typography>
                    <Select
                        value={project.name}
                        onChange={handleChange}
                        displayEmpty
                        // label="Project"
                    >
                        {projects.map((project) => (
                            <MenuItem value={project.name}>
                                <Typography sx={{ textAlign: 'center' }}>{project.name}</Typography>
                            </MenuItem>
                        ))}
                    </Select>
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