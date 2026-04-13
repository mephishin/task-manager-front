import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid2,
    Link,
    Menu,
    MenuItem,
    Typography
} from "@mui/material"
import * as React from "react";
import {useAllowedTaskStatusesGet, useChangeTaskStatus} from "../../../../hooks/query/task/useTask";
import {getLabel, Participant, Task} from "../../../../model/task/TasksChart";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface TaskCardProps {
    handleLink: (task: Task) => void,
    task: Task,
    participant?: Participant,
}

export const TaskCard = ({handleLink, task, participant}: TaskCardProps) => {
    const getAllowedStatuses = useAllowedTaskStatusesGet(task.key);
    const changeTaskStatus = useChangeTaskStatus(task.key);

    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>();

    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleSelectNavMenu = (event: any) => {
        changeTaskStatus.mutate({key: task.key, status: event.currentTarget.innerText})
        handleCloseNavMenu()
    };

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    if (!getAllowedStatuses.isPending) {
        return (
            <Card>
                <CardHeader sx={{p: 1}} title={<Grid2 container>
                    <Grid2 size={2}>
                        <Link component="button" onClick={() => handleLink(task)}>
                            <Typography color="primary">
                                {task.key}
                            </Typography>
                        </Link>
                    </Grid2>
                    <Grid2 size={10} sx={{display: "flex", justifyContent: "right", alignItems: "center"}}>
                        <Typography sx={{color: '#5E6C84'}}>
                            {participant ? getLabel(participant) : "Без исполнителя"}
                        </Typography>
                    </Grid2>
                </Grid2>}>
                </CardHeader>
                <CardContent sx={{p: 1}}>
                    <Typography sx={{color: '#5E6C84'}}>
                        {task.name}
                    </Typography>
                </CardContent>
                <CardActions sx={{display: "flex", justifyContent: "right"}}>
                    <Button
                        endIcon={<ArrowForwardIcon/>}
                        id={task.key}
                        onClick={handleOpenNavMenu}>
                        <Typography color="primary">
                            Статус
                        </Typography>
                    </Button>
                    <Menu id={task.key}
                          anchorEl={anchorElNav}
                          keepMounted
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}>
                        {getAllowedStatuses.data?.map((status) =>
                            <MenuItem id={status} key={status} onClick={handleSelectNavMenu}>
                                <Typography key={status}>{status}</Typography>
                            </MenuItem>)}
                    </Menu>
                </CardActions>
            </Card>
        )
    }
}