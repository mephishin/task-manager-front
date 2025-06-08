import AuthService from "../../../AuthService";
import {Task, UpdateTask} from "../../../model/task/Task";
import axios, {AxiosResponse} from "axios";
import {CreateTask} from "../../../model/task/CreateTask";
import {SearchTask} from "../../../model/task/SearchTask";

export function useTaskHttp() {
    const api = axios.create({
        baseURL: "http://localhost:8080"
    });

    api.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    const getTasksToSearch = (): Promise<Array<SearchTask>> =>
        api.get("/searchTasks")
            .then((response: AxiosResponse) => response.data)

    const getTaskStatuses = (): Promise<Array<string>> =>
        api.get("/statuses")
            .then((response: AxiosResponse) => response.data)

    const getTaskTypes = (): Promise<Array<string>> =>
        api.get("/types")
            .then((response: AxiosResponse) => response.data)

    const putTask = (task: UpdateTask): Promise<Task> =>
        api.put("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => response.data)

    const getTask = (key: string | undefined): Promise<Task> =>
        api.get(`/task/${key}`)
            .then((response: AxiosResponse) => response.data)

    const postTask = (task: CreateTask): Promise<Task> =>
        api.post("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => response.data)

    const changeTaskStatus = (variables: {
        key: string,
        status: string
    }): Promise<void> =>
        api.put(`task/${variables.key}/status/${variables.status}`)

    const closeTask = (variables: {
        taskKey?: string
    }): Promise<void> =>
        api.delete(`task/${variables.taskKey}`)

    const getAllowedTaskStatuses = (variables: {
        taskKey?: string
    }): Promise<Array<string>> =>
        api.get(`task/${variables.taskKey}/statuses?allowed=true`)
            .then((response: AxiosResponse) => response.data)

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