import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
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
import {CreateTask} from "../../model/task/Task";
import {useParticipantsGet} from "../../hooks/useParticipant";
import {useTaskCreate, useTaskTypesGet} from "../../hooks/useTask";
import {useProjectsGet} from "../../hooks/useProject";

const pages = [
    {
        name: 'My project',
        link: '/project'
    }
];
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

    const [project, setProject] = useState<string | null>(null);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement | undefined>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement | undefined>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        navigate(`/project`)
        setProject(null)
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onChangeHandler = (newValue: string | null) => {
        if (newValue) {
            setProject(newValue);
            navigate(`/project/${newValue}`)
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
                <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography sx={{textAlign: 'center'}}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box>
                        <FormControl sx={{minWidth: 300, backgroundColor: "white", borderRadius: 2, margin: 1, padding: 1}}>
                            <Autocomplete
                                value={project}
                                onChange={(event, newValue: string | null) => onChangeHandler(newValue)}
                                options={projects.data?.map((project: Project) => project.name)}
                                renderInput={(params) => <TextField {...params} label="project"/>}
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
                                    types={taskTypes?.data}
                                    participants={participants?.data}
                                    projects={projects?.data}
                                />
                            </Box>
                        </Modal>
                    </Box>
                    <Box>
                        <Tooltip title="">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
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
