import {Grid2, Stack} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {Participant, Task} from "../../model/task/TasksChart";
import {useChangeTaskStatus} from "../../hooks/query/task/useTask";
import { TaskCard } from "./TaskCard";
import { StatusCard } from "./StatusCard";

interface TaskTableProps {
    notAssignedTasks?: Array<Task>
    participants?: Array<Participant>
    statuses?: Array<string>
}

const styleGrid = {
    marginY: 2,
    p: 1,
    backgroundColor: '#F4F5F7'
}

export const TasksChart = ({notAssignedTasks, participants, statuses}: TaskTableProps) => {
    const navigate = useNavigate();
    const changeTaskStatus = useChangeTaskStatus();

    const handleLink = (task: Task) => {
        navigate(`/task/${task.key}`)
    }

    const renderNotAssignedTasks = (statuses?: Array<String>, notAssignedTasks?: Array<Task>) => {
      if (notAssignedTasks && notAssignedTasks?.length > 0) {
          return (
              <Grid2 container spacing={3}>
                  {statuses?.map((_status) => (
                          <Grid2 size={2} sx={styleGrid}>
                              <Stack spacing={2}>
                                  {notAssignedTasks!.filter((task) => task.status === _status).map((task) => (
                                      <TaskCard
                                          handleLink={handleLink}
                                          task={task}
                                          handleChangeStatus={changeTaskStatus.mutate}
                                      />
                                  ))}
                              </Stack>
                          </Grid2>
                      )
                  )}
              </Grid2>
              )
      }
    }

    return (
        <Box style={{margin: 10}}>
            <Grid2 direction={"column"} columns={statuses!.length * 2} style={{maxHeight: '92vh', overflow: 'auto'}}>
                <Grid2 container spacing={3} >
                    {statuses?.map((_status) => (
                        <Grid2 size={2} sx={styleGrid}>
                            <StatusCard status={_status}/>
                        </Grid2>
                    ))}
                </Grid2>
                {participants?.map((participant) => (
                    <Grid2 container spacing={3}>
                        {statuses?.map((_status) => (
                            <Grid2 size={2} sx={styleGrid}>
                                <Stack spacing={2}>
                                    {participant.tasks.filter((task) => task.status === _status).map((task) => (
                                        <TaskCard
                                            handleLink={handleLink}
                                            task={task}
                                            participant={participant}
                                            handleChangeStatus={changeTaskStatus.mutate}
                                        />
                                    ))}
                                </Stack>
                            </Grid2>
                        ))}
                    </Grid2>
                ))}
                {
                    renderNotAssignedTasks(statuses, notAssignedTasks)
                }
            </Grid2>
        </Box>
    )
}
