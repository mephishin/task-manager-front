import React, {useEffect, useState} from "react";
import {getTaskByKey} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {UpdateTaskForm} from "../components/forms/UpdateTaskForm";

class Task {
}

export const TaskPage = () => {
    const [task, setTask] = useState(new Task());
    const {key} = useParams();

    useEffect(() => {
        getTaskByKey(key)
            .then(res => {
                    setTask(res)
            })
    }, []);

    return (
        <UpdateTaskForm task={task} taskKey={key}/>
    )
}