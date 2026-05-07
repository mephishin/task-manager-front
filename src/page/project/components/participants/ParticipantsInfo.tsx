import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {useProjectGetById, useProjectInviteGet} from "../../../../hooks/query/project/useProject";
import PersonIcon from '@mui/icons-material/Person';
import {getLabel, Participant} from "../../../../hooks/query/project/useProjectHttpDto";
import {useRemoveUserFromProject} from "../../../../hooks/query/users/useUsers";
import Button from "@mui/material/Button";
import {useAuth} from "../../../../AuthProvider";

interface ProjectInfoPageProps {
    projectId: string
}

const readOnlyTextFieldStyle = {
    flexGrow: 1,
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused': {
            '& fieldset': {
                borderColor: 'grey.400',
                borderWidth: '1px',
            },
            '&:not(.Mui-error)': {
                boxShadow: 'none',
            },
        },
    },
    '& label.Mui-focused': {
        color: '#656565',
    },
}

const readOnlyTextFieldSlotProps = {
    input: {
        readOnly: true,
    }
};

const typographyStyle = {
    color: '#656565'
};

export const ParticipantsInfo = ({projectId}: ProjectInfoPageProps) => {
    const getProjectById = useProjectGetById(projectId);
    const getProjectInviteByProjectId = useProjectInviteGet(projectId);
    const {mutate} = useRemoveUserFromProject(projectId)

    const {hasRole, LEADER, getId} = useAuth();

    const [open, setOpen] = useState("");

    const handleClickOpen = (participant: Participant) => {
        setOpen(participant.id);
        console.log(open);
    };

    const handleClose = () => {
        setOpen("");
        console.log(open)

    };

    const handleConfirm = (participant: Participant) => {
        setOpen("");
        mutate(participant.id);
        console.log(open);
    };


    if (getProjectById.data && getProjectInviteByProjectId.data) {
        return (
            <Stack sx={{backgroundColor: '#F4F5F7', p: 2, borderRadius: 1, gap: 2}}>
                <Box sx={{borderRadius: 1, backgroundColor: "white", p: 1}}>
                    <Typography sx={typographyStyle} variant="h6">
                        Участники проекта "{getProjectById.data.name}"
                    </Typography>
                </Box>
                <Box sx={{borderRadius: 1, backgroundColor: "white"}}>
                    <List>
                        {getProjectById.data?.participants.map((participant) => (
                            <ListItem secondaryAction={
                                hasRole(LEADER) && getId() !== participant.id && (
                                    <>
                                        <IconButton edge="end" aria-label="delete"
                                                    onClick={() => handleClickOpen(participant)}>
                                            <DeleteIcon/>

                                        </IconButton>
                                        <Dialog
                                            open={open === participant.id}
                                            onClose={handleClose}
                                        >
                                            <DialogTitle>{"Подтверждение удаления"}</DialogTitle>

                                            <DialogContent>
                                                <DialogContentText>
                                                    Вы точно хотите удалить этот объект? Это действие нельзя будет отменить.
                                                </DialogContentText>
                                            </DialogContent>

                                            <DialogActions>
                                                <Button onClick={handleClose} color="inherit">
                                                    Нет
                                                </Button>

                                                <Button onClick={() => handleConfirm(participant)} color="error" autoFocus>
                                                    Да, удалить
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                )
                            }>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography color="primary">
                                        {getLabel(participant)}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{borderRadius: 1, backgroundColor: "white", p: 1, display: "flex"}}>
                    <TextField label={"Ключ приглашения"} slotProps={readOnlyTextFieldSlotProps}
                               helperText="Ключ нужен для того, чтобы пользователь стал участником проекта. Ключ одноразовый."
                               sx={readOnlyTextFieldStyle}
                               focused defaultValue={getProjectInviteByProjectId.data}></TextField>
                </Box>

            </Stack>
        )
    }
}

