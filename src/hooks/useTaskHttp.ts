import AuthService from "../AuthService";
import {Task, UpdateTask} from "../model/task/Task";
import {Project} from "../model/project/Project";
import {Participant} from "../model/participant/Participant";
import axios from "axios";
import {TasksPage} from "../model/task/TasksPage";
import {CreateTask} from "../model/task/CreateTask";
import {SearchTask} from "../model/task/SearchTask";

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

//  const getSomething = () =>
//     fetch("http://localhost:1080/api/v1/books?code=15345", {
//         method: "GET"
//     })
//         .then(response => response.json())
//         .catch(error => console.error(error));

    const getTasks = (projectName?: string): Promise<TasksPage> =>
        api.get(projectName ? `/tasksPage?project=${projectName}` : `/tasksPage`)
            .then(response => response.data)

    const getTasksToSearch = (): Promise<Array<SearchTask>> =>
        api.get("/searchTasks")
            .then(response => response.data)

    const getTaskStatuses = (): Promise<Array<string>> =>
        api.get("/statuses")
            .then(response => response.data)

    const getTaskTypes = (): Promise<Array<string>> =>
        api.get("/types")
            .then(response => response.data)

    const getProjects = (): Promise<Array<Project>> =>
        api.get("/projects")
            .then(response => response.data)

    const putTask = (task: UpdateTask): Promise<Task> =>
        api.put("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.data)

    const getTask = (key: string | undefined): Promise<Task> =>
        api.get(`/task/${key}`)
            .then(response => response.data)

    const postTask = (task: CreateTask): Promise<Task> =>
        api.post("/task", task, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(response => response.data)

    const getParticipants = (): Promise<Array<Participant>> =>
        api.get("/participants")
            .then(response => response.data)

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
            .then(response => response.data)

    return {
        getTasks,
        getTaskStatuses,
        getTaskTypes,
        getProjects,
        putTask,
        getTask,
        postTask,
        getParticipants,
        changeTaskStatus,
        closeTask,
        getAllowedTaskStatuses,
        getTasksToSearch
    }
}