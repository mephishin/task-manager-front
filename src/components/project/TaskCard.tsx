import {Box, Button, Card, CardContent, Menu, MenuItem, Typography} from "@mui/material"
import { Participant, Task } from "../../model/task/TasksChart"
import * as React from "react";
import {useAllowedTaskStatusesGet, useChangeTaskStatus} from "../../hooks/query/task/useTask";

interface TaskCardProps {
    handleLink: (task: Task) => void,
    task: Task,
    participant?: Participant,
}

export const TaskCard = ({handleLink, task, participant}: TaskCardProps) => {
    const getAllowedStatuses = useAllowedTaskStatusesGet(task.key);
    const changeTaskStatus = useChangeTaskStatus(task.key);

    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>();

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleSelectNavMenu = (event: any) => {
        changeTaskStatus.mutate({key: task.key, status: event.currentTarget.innerText})
        handleCloseNavMenu()
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    if (!getAllowedStatuses.isPending) {
        return (
            <Card>
                <CardContent>
                    <Button onClick={() => handleLink(task)} sx={{padding: 0, minHeight: 0, minWidth: 0}}>
                        {task.key}
                    </Button>
                    <Typography sx={{color: '#5E6C84'}}>
                        {task.name}
                    </Typography>
                    {
                        participant ? (
                            <Box>
                                <Typography sx={{color: '#5E6C84'}}>
                                    Assigned: {participant.username}
                                </Typography>
                                <Box>
                                    <Button sx={{color: '#5E6C84'}}
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                    >
                                        Change status
                                    </Button>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorElNav}
                                        keepMounted
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                    >
                                        {getAllowedStatuses.data?.map((status) => (
                                            <MenuItem key={status} onClick={handleSelectNavMenu}>
                                                <Typography key={status} sx={{textAlign: 'center'}}>{status}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Box>
                        ) : (
                            <Typography sx={{color: '#5E6C84'}}>
                                Not assigned
                            </Typography>
                        )
                    }
                </CardContent>
            </Card>
        )
    }
}