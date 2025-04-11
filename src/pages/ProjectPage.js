import React, { useState, useEffect} from 'react'
import {getTasks, getTaskStatuses} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";

export const ProjectPage = () => {
    const [participants, setParticipants] = useState([]);
    const [notAssignedTasks, setNotAssignedTasks] = useState([]);
    const [statuses, setStatuses] = useState([])
    const {project} = useParams();

    useEffect(() => {
        getTasks(project)
            .then(res => {
                    setParticipants(res.participants)
                    setNotAssignedTasks(res.notAssignedTasks)
            })
        getTaskStatuses()
            .then(res => setStatuses(res))
    }, [project]);

    return (
        <TasksTable participants={participants} statuses={statuses} notAssignedTasks={notAssignedTasks}/>
    );
};