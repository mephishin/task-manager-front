import { Task } from "../../../model/task/Task";
import { AxiosInstance, AxiosResponse } from "axios";
import { SearchTask } from "../../../model/task/SearchTask";
import { CreateTaskRq, UpdateTaskRq } from "./useTaskHttpDto";

export function useTaskHttp(axiosInstance: AxiosInstance) {
    const getTasksToSearch = (): Promise<SearchTask[]> =>
        axiosInstance.get("/task/search")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskStatuses = (projectKey: string | undefined): Promise<string[]> =>
        axiosInstance.get(`/status/${projectKey}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskTypes = (): Promise<string[]> =>
        axiosInstance.get("/type")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const putTask = (task: UpdateTaskRq): Promise<Task> =>
        axiosInstance.put("/task", task, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTask = (key: string | undefined): Promise<Task> =>
        axiosInstance.get(`/task/${key}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const postTask = (task: CreateTaskRq): Promise<Task> =>
        axiosInstance.post("/task", task, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response: AxiosResponse) => {
                return response.data
            })

    const changeTaskStatus = (variables: {
        key: string,
        status: string
    }): Promise<void> =>
        axiosInstance.put(`task/${variables.key}/status/${variables.status}`)

    const closeTask = (variables: {
        taskKey?: string
    }): Promise<void> =>
        axiosInstance.delete(`task/${variables.taskKey}`)

    const getAllowedTaskStatuses = (variables: {
        taskKey?: string
    }): Promise<string[]> =>
        axiosInstance.get(`task/${variables.taskKey}/statuses?allowed=true`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    return {
        getTaskStatuses,
        getTaskTypes,
        putTask,
        getTask,
        postTask,
        changeTaskStatus,
        closeTask,
        getAllowedTaskStatuses,
        getTasksToSearch,
    }
}