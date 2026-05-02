import {
    Box,
    Grid2,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    Stack,
    styled, TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useProjectGetById, useProjectInviteGet
} from "../../../../hooks/query/project/useProject";
import AuthService from "../../../../AuthService";
import PersonIcon from '@mui/icons-material/Person';
import {getLabel} from "../../../../hooks/query/project/useProjectHttpDto";
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

    const isLeader = AuthService.hasRole(AuthService.LEADER_ROlE)


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
                                isLeader && (
                                    <IconButton edge="end" aria-label="delete" onClick={() => {
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>)
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
