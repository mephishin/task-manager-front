import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useTaskCreate } from "../../hooks/query/task/useTask";
import { Project } from "../../model/project/Project";
import { Users } from "../../model/participant/Participant";
import { CreateTask } from "../../model/task/CreateTask";
import { CreateTaskForm } from "../forms/CreateTaskForm";
import AuthService from "../../AuthService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface CreateTaskButtonProps {
    taskTypes: Array<string>;
    users: Array<Users>;
    projects: Array<Project>;
    authUsersProject: Project;
}

export const CreateTaskButton = ({ taskTypes, users, projects, authUsersProject }: CreateTaskButtonProps) => {
    const onSubmitCreateTask = (data: CreateTask) => {
        createTask.mutate(data)
        handleClose()
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createTask = useTaskCreate();

    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)

    if (!isLeader) {
        projects = projects.filter(p => p.key == authUsersProject.key)
    }

    return (
        <Box>
            <Button sx={{ backgroundColor: "white" }} onClick={handleOpen}>Создать задачу</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography>Создание новой задачи</Typography>
                    <CreateTaskForm
                        onSubmit={onSubmitCreateTask}
                        types={taskTypes}
                        users={users}
                        projects={projects}
                        authUsersProject={authUsersProject}
                    />
                </Box>
            </Modal>
        </Box>
    )
}