import {Box, Button, Card, CardContent, Link, Menu, MenuItem, Typography} from "@mui/material"
import { Participant, Task } from "../../model/task/TasksPage"
import * as React from "react";
import {useAllowedTaskStatusesGet, useChangeTaskStatus} from "../../hooks/useTask";

interface TaskCardProps {
    handleLink: (task: Task) => void,
    task: Task,
    participant?: Participant,
    handleChangeStatus: (variables: {key: string, status: string}) => void
}

export const TaskCard = ({handleLink, task, participant, handleChangeStatus}: TaskCardProps) => {
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
                    <Link onClick={() => handleLink(task)} underline="hover">
                        {task.key}
                    </Link>
                    <Typography>
                        {task.name}
                    </Typography>
                    {
                        participant ? (
                            <Box>
                                <Typography>
                                    Assigned: {participant.username}
                                </Typography>
                                <Box>
                                    <Button
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
                            <Typography>
                                Not assigned
                            </Typography>
                        )
                    }
                </CardContent>
            </Card>
        )
    }
}