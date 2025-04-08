import React, { useState, useEffect} from 'react'
import {getTasksByAuthParticipant, getTaskStatuses} from "../adapter/resources";
import {TasksTable} from "../components/tasks/TasksTable";

export const TasksPage = () => {
    const [participants, setParticipants] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        getTasksByAuthParticipant()
            .then(res => setParticipants(res.participants))
        getTaskStatuses()
            .then(res => setStatuses(res))
    }, []);

    return(
        <TasksTable participants={participants} statuses={statuses}/>
    )
};