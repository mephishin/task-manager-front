import React, {useEffect, useState} from "react";
import {getAllParticipants, getTaskByKey, getTaskStatuses, getTaskTypes} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {UpdateTaskForm} from "../components/forms/UpdateTaskForm";

export const TaskPage = () => {
    const {key} = useParams();

    const [types, setTypes] = useState([])
    const [participants, setParticipants] = useState([])
    const [statuses, setStatuses] = useState([])
    const [task, setTask] = useState([])

    useEffect( () => {
        getTaskTypes()
            .then(types => setTypes(types))
        getTaskStatuses()
            .then(statuses => setStatuses(statuses))
        getAllParticipants()
            .then(participants => setParticipants(participants))
        getTaskByKey(key)
            .then(task => setTask(task))
    }, [])

    return (
        <UpdateTaskForm taskKey={key} types={types} participants={participants} statuses={statuses} task={task}/>
    )
}