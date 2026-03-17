import {CreateTaskForm} from "../forms/CreateTaskForm";
import * as React from "react";
import {Box, Button, Modal} from "@mui/material";
import {CreateTask} from "../../model/task/CreateTask";
import {useState} from "react";
import {useTaskCreate} from "../../hooks/query/task/useTask";
import {Project} from "../../model/project/Project";
import {Participant} from "../../model/participant/Participant";

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

interface CreateTaskButtonProps {
    taskTypes: Array<string>;
    participants: Array<Participant>;
    projects: Array<Project>;
    authParticipantProject?: Project;
}

export const CreateTaskButton = ({taskTypes, participants, projects, authParticipantProject} : CreateTaskButtonProps) => {
    const onSubmitCreateTask = (data: CreateTask) => {
        createTask.mutate(data)
        handleClose()
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const createTask = useTaskCreate();


    return(
        <Box>
            <Button sx={{backgroundColor: "white"}} onClick={handleOpen}>Создать задачу</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateTaskForm
                        onSubmit={onSubmitCreateTask}
                        types={taskTypes}
                        participants={participants}
                        projects={projects}
                        authParticipantProject={authParticipantProject}
                    />
                </Box>
            </Modal>
        </Box>
    )
}