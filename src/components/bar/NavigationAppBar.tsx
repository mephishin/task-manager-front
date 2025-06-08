import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Outlet} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useState} from "react";
import {Project} from "../../model/project/Project";
import {useParticipantsGet} from "../../hooks/query/participant/useParticipant";
import {useTaskTypesGet} from "../../hooks/query/task/useTask";
import {useAuthParticipantProjectGet, useProjectsGet} from "../../hooks/query/project/useProject";
import {NavigationButton} from "./NavigationButton";
import {ProjectAutocomplete} from "./ProjectAutocomplete";
import {TaskAutocomplete} from "./TaskAutocomplete";
import {CreateTaskButton} from "./CreateTaskButton";
import {ProfileButton} from "./ProfileButton";

export const NavigationAppBar = () => {
    const participants = useParticipantsGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();
    const authParticipantProject = useAuthParticipantProjectGet();

    const [project, setProject] = useState<Project | null>(null);

    if (
        !taskTypes.isPending
        && !participants.isPending
        && !projects.isPending
        && !authParticipantProject.isPending
    ) {
        console.log(authParticipantProject)
        return (
            <AppBar>
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <NavigationButton setProject={(project: Project) => setProject(project)}/>
                    <ProjectAutocomplete projects={projects.data} project={project} authParticipantProject={authParticipantProject.data!} setProject={(project: Project) => setProject(project)}/>
                    <TaskAutocomplete/>
                    <CreateTaskButton taskTypes={taskTypes.data} participants={participants.data} projects={projects.data}/>
                    <ProfileButton/>
                </Toolbar>
                <Outlet context={project}/>
            </AppBar>
        );
    } else return <CircularProgress/>

}
