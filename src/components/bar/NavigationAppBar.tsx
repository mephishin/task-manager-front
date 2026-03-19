import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { Project } from "../../model/project/Project";
import { useTaskTypesGet } from "../../hooks/query/task/useTask";
import { useAuthParticipantProjectGet, useProjectsGet } from "../../hooks/query/project/useProject";
import { NavigationButton } from "./NavigationButton";
import { ProjectAutocomplete } from "./ProjectAutocomplete";
import { TaskAutocomplete } from "./TaskAutocomplete";
import { CreateTaskButton } from "./CreateTaskButton";
import { ProfileButton } from "./ProfileButton";
import AuthService from '../../AuthService';
import { CreateProjectButton } from './CreateProjectButton';
import { useUsersGet } from '../../hooks/query/users/useUsers';

export const NavigationAppBar = () => {
    const users = useUsersGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();
    const authUsersProject = useAuthParticipantProjectGet();

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
        }

        return (
            <AppBar>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <NavigationButton setProject={(project: Project) => setProject(project)} />
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
                <Outlet context={project} />
            </AppBar>
        );
    } else return <CircularProgress />

}
