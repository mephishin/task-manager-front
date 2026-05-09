import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Grid2,
    Link,
    Menu,
    MenuItem,
    Typography
} from "@mui/material"
import * as React from "react";
import {useState} from "react";
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

    const [open, setOpen] = useState("");


    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleClickOpen = (key: string) => {
        setOpen(key);
    };

    const handleClose = () => {
        setOpen("");
        handleCloseNavMenu()

    };

    const handleConfirm = (key: string, status: string) => {
        setOpen("");
        changeTaskStatus.mutate({key: key, status: status})
    };

    if (!getAllowedStatuses.isPending) {
        return (
            <Card>
                <CardHeader sx={{p: 1}} title={<Grid2 container>
                    <Grid2 size={4}>
                        <Link component="button" onClick={() => handleLink(task)}>
                            <Typography color="primary">
                                {task.key}
                            </Typography>
                        </Link>
                    </Grid2>
                    <Grid2 size={8} sx={{display: "flex", justifyContent: "right", alignItems: "center"}}>
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
                        {getAllowedStatuses.data?.map((status) => {
                            return status === "ЗАКРЫТА" ? <MenuItem id={status} key={status} onClick={
                                (_) => handleClickOpen(task.key)}>
                                <Typography color={"error"} key={status}>{status}</Typography>
                            </MenuItem> : <MenuItem id={status} key={status} onClick={
                                (event) => handleSelectNavMenu(event)}>
                                <Typography sx={{color: "#5E6C84"}} key={status}>{status}</Typography>
                            </MenuItem>
                        })}
                    </Menu>
                    <Dialog
                        open={open === task.key}
                        onClose={handleClose}
                    >
                        <DialogContent>
                            <DialogContentText>
                                Вы точно хотите закрыть эту задачу? Это действие нельзя будет отменить.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} sx={{color: "#5E6C84"}}>
                                Нет
                            </Button>

                            <Button onClick={() => handleConfirm(task.key, "ЗАКРЫТА")} color="error" autoFocus>
                                Да, закрыть
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Card>
        )
    }
}