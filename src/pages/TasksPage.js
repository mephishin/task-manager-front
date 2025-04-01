import React, { useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import {
    Card,
    CardContent,
    Divider,
    FormControl,
    Link, Modal, Select,
    Stack,
    Typography
} from "@mui/material";
import {getAllProjects, getTasks, getTaskStatuses} from "../adapter/resources";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {CreateTaskForm} from "../components/forms/CreateTaskForm";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setStatuses] = useState([]);
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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
            <Box sx={{ margin: 2 }}>
                <Button sx={{ backgroundColor: "white" }} onClick={handleOpen}>Create task</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CreateTaskForm handleClose={handleClose} />
                    </Box>
                </Modal>
            </Box>
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