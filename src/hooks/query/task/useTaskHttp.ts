import {Task} from "../../../model/task/Task";
import {AxiosInstance, AxiosResponse} from "axios";
import {SearchTask} from "../../../model/task/SearchTask";
import { CreateTask } from "../../../model/task/CreateTask";
import { UpdateTask } from "../../../model/task/UpdateTask";

export function useTaskHttp(axiosInstance: AxiosInstance) {
    const getTasksToSearch = (): Promise<Array<SearchTask>> =>
        axiosInstance.get("/searchTasks")
            .then((response: AxiosResponse) => {
                console.log("Got searchTasks: ")
                console.log(response.data)
                return response.data
            })

    const getTaskStatuses = (projectKey: string | undefined): Promise<Array<string>> =>
        axiosInstance.get(`/statuses/${projectKey}`)
            .then((response: AxiosResponse) => {
                console.log("Got taskStatuses: ")
                console.log(response.data)
                return response.data
            })

    const getTaskTypes = (): Promise<Array<string>> =>
        axiosInstance.get("/types")
            .then((response: AxiosResponse) => {
                console.log("Got taskTypes: ")
                console.log(response.data)
                return response.data
            })

    const putTask = (task: UpdateTask): Promise<Task> =>
        axiosInstance.put("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => {
                console.log("Got updatedTask: ")
                console.log(response.data)
                return response.data
            })

    const getTask = (key: string | undefined): Promise<Task> =>
        axiosInstance.get(`/task/${key}`)
            .then((response: AxiosResponse) => {
                console.log("Got task by key: ")
                console.log(response.data)
                return response.data
            })

    const postTask = (task: CreateTask): Promise<Task> =>
        axiosInstance.post("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => {
                console.log("Got created task: ")
                console.log(response.data)
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
    }): Promise<Array<string>> =>
        axiosInstance.get(`task/${variables.taskKey}/statuses?allowed=true`)
            .then((response: AxiosResponse) => {
                console.log("Got allowed task statuses: [" + response.data + "] for task with key: " + variables.taskKey)
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
        getTasksToSearch
    }
}