import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import {
    Autocomplete,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormHelperText, InputLabel, Link, Select,
    Stack, styled,
    TextField,
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
                .then(tasks => setTasks(tasks))
                .catch(() => console.log("ERROR"));
        }
    }, [project]);

    const handleChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <div>
            <Box>
                <FormControl sx={{ m: 1, minWidth: 120, color: "white"}} >
                    <InputLabel sx={{color: "white"}} id="demo-simple-select-standard-label">Age</InputLabel>
                    <Select
                        sx={{color: "white"}}
                        labelId="demo-simple-select-standard-label"
                        value={project.name}
                        onChange={handleChange}
                        displayEmpty
                        label="Age"
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
                            <Typography align={"center"}>
                                {status}
                            </Typography>
                            {tasks.filter(task => task.status === status).map((task) => (
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
        </div>
    );
};