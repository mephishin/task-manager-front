import {AxiosInstance, AxiosResponse} from "axios";
import {Project} from "../../../model/project/Project";
import { CreateProject } from "../../../model/project/CreateProject";

export function useProjectHttp(axiosInstance: AxiosInstance) {
    const getProjects = (): Promise<Array<Project>> =>
        axiosInstance.get("/projects")
            .then((response: AxiosResponse) => {
                console.log("Got projects: ")
                console.log(response.data)
                return response.data
            })

    const getProjectByAuth = (): Promise<Project> =>
        axiosInstance.get("/project?filter=auth")
            .then((response: AxiosResponse) => {
                console.log("Got auth participant project: ")
                console.log(response.data)
                return response.data
            })

    const createProject = (project: CreateProject): Promise<Project> =>
        axiosInstance.post("/project", project, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => {
                console.log("Got created project: ")
                console.log(response.data)
                return response.data
            })

    return {
        getProjects,
        getProjectByAuth,
        createProject
    }
}