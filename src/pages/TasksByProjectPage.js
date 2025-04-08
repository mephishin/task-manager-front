import React, { useState, useEffect} from 'react'
import {getTasks} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";

export const TasksByProjectPage = () => {
    const [participants, setParticipants] = useState([]);
    const {project} = useParams();

    useEffect(() => {
        getTasks(project)
            .then(res => setParticipants(res.participants))
    }, [project]);

    return (
        <TasksTable participants={participants}/>
    );
};