import React, { useState, useEffect} from 'react'
import {getTasks} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {TasksTable} from "../components/tasks/TasksTable";

export const TasksByProjectPage = () => {
    const [tasks, setTasks] = useState([]);
    const {project} = useParams();

    useEffect(() => {
        getTasks(project)
            .then(res => setTasks(res))
    }, [project]);

    return (
        <TasksTable tasks={tasks}/>
    );
};