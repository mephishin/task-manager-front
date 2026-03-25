import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Project } from "../../model/project/Project";
import { useTaskTypesGet } from "../../hooks/query/task/useTask";
import { useAuthParticipantProjectGet, useProjectsGet } from "../../hooks/query/project/useProject";
import { useUsersGet } from '../../hooks/query/users/useUsers';
import { NavigationButton } from './components/NavigationButton';
import { ProjectAutocomplete } from './components/ProjectAutocomplete';
import { CreateTaskButton } from './components/CreateTaskButton';
import { CreateProjectButton } from './components/CreateProjectButton';
import { ProfileButton } from './components/ProfileButton';
import { TaskAutocomplete } from './components/TaskAutocomplete';
import AuthService from '../../AuthService';

export const NavigationAppBar = () => {
    const users = useUsersGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();
    const authUsersProject = useAuthParticipantProjectGet();

    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();

    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)

    if (
        !taskTypes.isPending
        && !users.isPending
        && !projects.isPending
        && !authUsersProject.isPending
    ) {
        if (!project) {
            setProject(authUsersProject.data!)
            navigate(`/project/${authUsersProject.data!.key}`)
        }

        return (
            <AppBar sx={{ height: "100vh" }}>
                <Toolbar sx={{ justifyContent: "space-between", height: "8vh"}}>
                    <NavigationButton authUserProject={authUsersProject.data!} />
                    <ProjectAutocomplete visible={isLeader} projects={projects.data} project={project} setProject={(project: Project) => setProject(project)} />
                    <TaskAutocomplete />
                    <CreateTaskButton
                        taskTypes={taskTypes.data}
                        users={users.data.filter(u => u.project == project!.name)}
                        projects={projects.data}
                        authUsersProject={project!} />
                    <CreateProjectButton
                        visible={isLeader}
                        participants={users.data} />
                    <ProfileButton />
                </Toolbar>
                <Outlet />
            </AppBar>
        );
    } else return <CircularProgress />

}
