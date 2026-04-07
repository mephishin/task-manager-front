import * as React from "react";
import { Box, MenuItem, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { CreateProjectForm } from "./CreateProjectForm";
import AuthService from "../../../../AuthService";
import { useUsersGet } from "../../../../hooks/query/users/useUsers";
import { CreateProject } from "./CreateProjectFormSchema";
import { useProjectCreate } from "../../../../hooks/query/project/useProject";

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

interface CreateProjectMenuItemProps {
    onClose: () => void
}

export const CreateProjectMenuItem = ({ onClose }: CreateProjectMenuItemProps) => {
    const users = useUsersGet();
    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)
    const onSubmitCreateProject = (data: CreateProject) => {
        createProject.mutate({
            name: data.name,
            description: data.description,
            participants: data.participants.map(p => p.id),
            taskPrefix: data.taskPrefix,
        })
        handleClose()
        onClose()
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createProject = useProjectCreate();

    if (isLeader && users.data) {
        return (
            <Box>
                <MenuItem sx={{ backgroundColor: "white" }} onClick={handleOpen}>Создать проект</MenuItem>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography>Создание нового проекта</Typography>
                        <CreateProjectForm
                            onSubmit={onSubmitCreateProject}
                            participants={users.data}
                        />
                    </Box>
                </Modal>
            </Box>
        )
    }
}