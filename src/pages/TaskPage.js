import React from "react";
import {
    getAllParticipants,
    getTaskByKey,
    getTaskStatuses,
    getTaskTypes,
    updateTaskByTaskKey
} from "../adapter/resources";
import {useParams} from "react-router-dom";
import {UpdateTaskForm} from "../components/forms/UpdateTaskForm";
import {useMutation, useQueries, useQueryClient} from "@tanstack/react-query";
import {CircularProgress} from "@mui/material";

export const TaskPage = () => {
    const {key} = useParams();
    const queryClient = useQueryClient()

    const [
        taskTypesQuery,
        taskStatusesQuery,
        allParticipantsQuery,
        taskByKeyQuery
    ] = useQueries({
        queries: [
            {
                queryKey: ['taskTypes'],
                queryFn: () => getTaskTypes()
            },
            {
                queryKey: ['taskStatuses'],
                queryFn: () => getTaskStatuses()
            },
            {
                queryKey: ['allParticipants'],
                queryFn: () => getAllParticipants()
            },
            {
                queryKey: ['taskByKey'],
                queryFn: () => getTaskByKey(key)
            },
        ],
    });

    const taskByKeyMutation = useMutation({
        mutationFn: updateTaskByTaskKey,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["taskByKey"]
            })
        }
    })

    if (
        !taskTypesQuery.isPending
        && !taskStatusesQuery.isPending
        && !allParticipantsQuery.isPending
        && !taskByKeyQuery.isPending
    ) {
        return (
            <UpdateTaskForm
                taskKey={key}
                types={taskTypesQuery.data}
                participants={allParticipantsQuery.data}
                statuses={taskStatusesQuery.data}
                task={taskByKeyQuery.data}
                updateTask={taskByKeyMutation}
            />
        )
    } else return <CircularProgress color={"white"}/>
}