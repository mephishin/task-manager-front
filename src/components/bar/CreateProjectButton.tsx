import * as React from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import {useState} from "react";
import { CreateProjectForm } from "../forms/CreateProjectForm";
import { Users } from "../../model/participant/Participant";
import { useProjectCreate } from "../../hooks/query/project/useProject";
import { CreateProject } from "../../model/project/CreateProject";

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

interface CreateProjectButtonProps {
    participants: Array<Users>;
    visible: boolean;
}

export const CreateProjectButton = ({participants, visible} : CreateProjectButtonProps) => {
    const onSubmitCreateProject = (data: CreateProject) => {
        createProject.mutate(data)
        handleClose()
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createProject = useProjectCreate();

    if (visible) {
        return(
                <Box>
                    <Button sx={{backgroundColor: "white"}} onClick={handleOpen}>Создать проект</Button>
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
                                participants={participants}
                            />
                        </Box>
                    </Modal>
                </Box>
            )
    }
}