import {AxiosInstance, AxiosResponse} from "axios";
import {Project} from "../../../model/project/Project";

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

    return {
        getProjects,
        getProjectByAuth
    }
}