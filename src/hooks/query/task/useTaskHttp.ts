import { Task } from "../../../model/task/Task";
import { AxiosInstance, AxiosResponse } from "axios";
import { SearchTask } from "../../../model/task/SearchTask";
import { CreateTask } from "../../../model/task/CreateTask";
import { UpdateTask } from "../../../model/task/UpdateTask";
import { TaskComment } from "../../../model/task/TaskComment";

export function useTaskHttp(axiosInstance: AxiosInstance) {
    const getTasksToSearch = (): Promise<Array<SearchTask>> =>
        axiosInstance.get("/task/search")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskStatuses = (projectKey: string | undefined): Promise<Array<string>> =>
        axiosInstance.get(`/status/${projectKey}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskTypes = (): Promise<Array<string>> =>
        axiosInstance.get("/type")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const putTask = (task: UpdateTask): Promise<Task> =>
        axiosInstance.put("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
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

    const postTask = (task: CreateTask): Promise<Task> =>
        axiosInstance.post("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
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
    }): Promise<Array<string>> =>
        axiosInstance.get(`task/${variables.taskKey}/statuses?allowed=true`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskComments = (variables: {
        taskKey?: string
    }): Promise<Array<TaskComment>> =>
        axiosInstance.get(`task/${variables.taskKey}/comment`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const saveTaskComment = (variables: {
        taskKey?: string,
        commentText?: string
    }): Promise<Array<string>> =>
        axiosInstance.post(`task/${variables.taskKey}/comment`, {
            text : variables.commentText})
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
        getTaskComments,
        saveTaskComment
    }
}