import axios from "axios";
import AuthService from "../AuthService";

// export const getSomething = () =>
//     fetch("http://localhost:1080/api/v1/books?code=15345", {
//         method: "GET"
//     })
//         .then(response => response.json())
//         .catch(error => console.error(error));

const api = axios.create({
   baseURL: "http://localhost:8080"
});

api.interceptors.request.use(function (config) {
    if (AuthService.isLoggedIn()) {
        const cb = () => {
            config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
            return Promise.resolve(config);
        };
        return AuthService.updateToken(cb);
    }
});

export const getTasks = (projectName) =>
    api.get(`/task/all/${projectName}`)
        .then(response => response.data)
        .catch(error => console.error(error))

export const getTaskStatuses = () =>
    api.get("/task/statuses")
        .then(response => response.data)
        .catch(error => console.error(error));

export const getTaskTypes = () =>
    api.get("/task/types")
        .then(response => response.data)
        .catch(error => console.error(error));

export const getAllProjects = () =>
    api.get("/project")
        .then(response => response.data)
        .catch(error => console.error(error))

export const updateTaskByTaskKey = (task) =>
    api.put("/task", task, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(response => response.data)
        .catch(error => console.error(error))

export const getTaskByKey = (key) =>
    api.get(`/task/${key}`)
        .then(response => response.data)
        .catch(error => console.error(error));

export const createTask = (task) =>
    api.post("/task", task, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
        .then(response => response.data)
        .catch(error => console.error(error))

export const getTasksByAuthParticipant = () =>
    api.get("/task/all")
        .then(response => response.data)
        .catch(error => console.error(error))