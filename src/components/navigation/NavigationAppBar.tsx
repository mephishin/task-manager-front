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
import {Outlet} from "react-router-dom";
import {CircularProgress, Modal} from "@mui/material";
import AuthService from "../../AuthService";
import {useState} from "react";
import Button from "@mui/material/Button";
import {CreateTaskForm} from "../forms/CreateTaskForm";
import {Project} from "../../model/project/Project";
import {useParticipantsGet} from "../../hooks/useParticipant";
import {useTaskCreate, useTaskTypesGet} from "../../hooks/useTask";
import {useProjectsGet} from "../../hooks/useProject";
import {CreateTask} from "../../model/task/CreateTask";
import {NavigationButton} from "./NavigationButton";
import {ProjectAutocomplete} from "./ProjectAutocomplete";
import {TaskAutocomplete} from "./TaskAutocomplete";
import {CreateTaskButton} from "./CreateTaskButton";
import {ProfileButton} from "./ProfileButton";

export const NavigationAppBar = () => {
    const participants = useParticipantsGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();

    const [project, setProject] = useState<Project | null>(null);

    if (
        !taskTypes.isPending
        && !participants.isPending
        && !projects.isPending
    ) {
        return (
            <AppBar>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <NavigationButton setProject={setProject}/>
                    <ProjectAutocomplete projects={projects.data} project={project} setProject={setProject}/>
                    <TaskAutocomplete/>
                    <CreateTaskButton taskTypes={taskTypes.data} participants={participants.data} projects={projects.data}/>
                    <ProfileButton/>
                </Toolbar>
                <Outlet context={project}/>
            </AppBar>
        );
    } else return <CircularProgress/>

}
