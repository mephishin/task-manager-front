import AuthService from "../AuthService";
import {CreateTask, Task, UpdateTask} from "../model/task/Task";
import {TaskStatus} from "../model/task/TaskStatus";
import {TaskType} from "../model/task/TaskType";
import {Project} from "../model/project/Project";
import {Participant} from "../model/participant/Participant";
import axios from "axios";
import {TasksPage} from "../model/task/TasksPage";

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

    const getTasks = (projectName: string | undefined): Promise<TasksPage> =>
        api.get(projectName ? `/tasks?name=${projectName}` : `/tasks`)
            .then(response => response.data)

    const getTaskStatuses = (): Promise<Array<TaskStatus>> =>
        api.get("/task/statuses")
            .then(response => response.data)

    const getTaskTypes = (): Promise<Array<TaskType>> =>
        api.get("/task/types")
            .then(response => response.data)

    const getProjects = (): Promise<Array<Project>> =>
        api.get("/project")
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

    return {
        getTasks,
        getTaskStatuses,
        getTaskTypes,
        getProjects,
        putTask,
        getTask,
        postTask,
        getParticipants
    }
}