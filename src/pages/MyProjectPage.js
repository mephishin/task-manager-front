import React, { useState, useEffect} from 'react'
import {getTasksByAuthParticipant, getTaskStatuses} from "../adapter/resources";
import {TasksTable} from "../components/tasks/TasksTable";

export const MyProjectPage = () => {
    const [participants, setParticipants] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [notAssignedTasks, setNotAssignedTasks] = useState([]);

    useEffect(() => {
        getTasksByAuthParticipant()
            .then(res => {
                setParticipants(res.participants)
                setNotAssignedTasks(res.notAssignedTasks)
            })
        getTaskStatuses()
            .then(res => setStatuses(res))
    }, []);

    return(
        <TasksTable notAssignedTasks={notAssignedTasks} statuses={statuses} participants={participants}/>
    )
};

