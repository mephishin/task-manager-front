import * as React from "react";
import { Box, MenuItem, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { CreateTask } from "../../../model/task/CreateTask";
import { useTaskCreate, useTaskTypesGet } from "../../../hooks/query/task/useTask";
import AuthService from "../../../AuthService";
import { CreateTaskForm } from "./CreateTaskForm";
import { useUsersGet } from "../../../hooks/query/users/useUsers";
import { useProjectsGet } from "../../../hooks/query/project/useProject";
import { useParams } from "react-router-dom";

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

interface CreateTaskMenuItemProps {
    onClose: () => void
}

export const CreateTaskMenuItem = ({onClose}: CreateTaskMenuItemProps) => {
    const { projectId, projectName } = useParams();

    const users = useUsersGet();
    const taskTypes = useTaskTypesGet();
    const projects = useProjectsGet();

    const onSubmitCreateTask = (data: CreateTask) => {
        createTask.mutate(data)
        handleClose()
        onClose()
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createTask = useTaskCreate();

    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)

    //     if (!isLeader) {
    //         projects = projects.data.filter(p => p.key == projectId)
    //     }

    return (users.data && taskTypes.data && projects.data && (
        <Box>
            <MenuItem onClick={handleOpen}>
                <Typography sx={{ textAlign: 'center' }}>Создать задачу</Typography>
            </MenuItem>
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
                        types={taskTypes.data}
                        users={users.data.filter(user => user.project == projectName!)}
                        projects={projects.data}
                        project={{ key: projectId!, name: projectName! }}
                    />
                </Box>
            </Modal>
        </Box>
    ))
}