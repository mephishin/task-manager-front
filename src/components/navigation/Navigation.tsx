import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Outlet, useNavigate} from "react-router-dom";
import {Autocomplete, CircularProgress, FormControl, Modal, TextField} from "@mui/material";
import AuthService from "../../AuthService";
import {useState} from "react";
import Button from "@mui/material/Button";
import {CreateTaskForm} from "../forms/CreateTaskForm";
import {Project} from "../../model/project/Project";
import {useParticipantsGet} from "../../hooks/useParticipant";
import {useSearchTaskGet, useTaskCreate, useTaskTypesGet} from "../../hooks/useTask";
import {useProjectsGet} from "../../hooks/useProject";
import {CreateTask} from "../../model/task/CreateTask";
import {SearchTask} from "../../model/task/SearchTask";
import {NavigationButton} from "./NavigationButton";

const settings = [
    {
        name: 'Logout',
        link: '/logout'

    }
];
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

export const Navigation = () => {
    const participants = useParticipantsGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();
    const createTask = useTaskCreate();
    const searchTasks = useSearchTaskGet();

    const [project, setProject] = useState<Project | null>(null);
    const [searchTask, setSearchTask] = useState<SearchTask | null>(null);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>();


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onChangeProjectHandler = (newValue: Project | null) => {
        if (newValue) {
            setProject(newValue);
            navigate(`/project/${newValue.name}`);
        }
    };

    const onChangeSearchTaskHandler = (newValue: SearchTask | null) => {
        if (newValue) {
            setSearchTask(newValue);
            navigate(`/task/${newValue.taskKey}`)
        }
    };

    const onSubmitCreateTask = (data: CreateTask) => {
        createTask.mutate(data)
        handleClose()
    }

    if (
        !taskTypes.isPending
        && !participants.isPending
        && !projects.isPending
    ) {
        return (
            <AppBar>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <NavigationButton setProject={setProject}/>
                    <Box>
                        <FormControl sx={{minWidth: 300, backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                            <Autocomplete
                                value={project}
                                onChange={(event, newValue) => onChangeProjectHandler(newValue)}
                                options={projects.data}
                                getOptionLabel={(option: Project) => option.name}
                                renderInput={(params) => <TextField {...params} label="project"/>}
                            >
                            </Autocomplete>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl sx={{minWidth: 300, backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                            <Autocomplete
                                value={searchTask}
                                options={searchTasks.data}
                                loading={searchTasks.isLoading}
                                onChange={(event, newValue) => onChangeSearchTaskHandler(newValue)}
                                getOptionLabel={(option: SearchTask) => option.name}
                                renderInput={(params) => <TextField {...params} label="task"/>}
                                filterOptions={(options: Array<SearchTask>, state: any) => {
                                    return options.filter((option: SearchTask) =>
                                        option.taskKey.includes(state.inputValue) || option.name.includes(state.inputValue) || option.description.includes(state.inputValue))
                                }}
                            >
                            </Autocomplete>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button sx={{backgroundColor: "white"}} onClick={handleOpen}>Create task</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <CreateTaskForm
                                    onSubmit={onSubmitCreateTask}
                                    types={taskTypes.data}
                                    participants={participants.data}
                                    projects={projects.data}
                                />
                            </Box>
                        </Modal>
                    </Box>
                    <Box>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt="Remy Sharp"/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => {
                                    handleCloseUserMenu();
                                    AuthService.doLogout();
                                }

                                }>
                                    <Typography sx={{textAlign: 'center'}}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
                <Outlet context={project}/>
            </AppBar>
        );
    } else return <CircularProgress/>

}
