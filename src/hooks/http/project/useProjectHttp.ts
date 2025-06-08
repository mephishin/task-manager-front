import axios, {AxiosResponse} from "axios";
import AuthService from "../../../AuthService";
import {Project} from "../../../model/project/Project";

export function useProjectHttp() {
    const api = axios.create({
        baseURL: "http://localhost:8080"
    });

    api.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    const getProjects = (): Promise<Array<Project>> =>
        api.get("/projects")
            .then((response: AxiosResponse) => response.data)

    const getProjectByAuth = (): Promise<Project> =>
        api.get("/project?filter=auth")
            .then((response: AxiosResponse) => response.data)

    return {
        getProjects,
        getProjectByAuth
    }
}