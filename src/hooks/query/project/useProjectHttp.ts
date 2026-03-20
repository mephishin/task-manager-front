import { AxiosInstance, AxiosResponse } from "axios";
import { Project } from "../../../model/project/Project";
import { CreateProject } from "../../../model/project/CreateProject";
import { ProjectFile } from "../../../model/project/ProjectFile";
import { transformZipToFiles } from "../../../util/ZIp";

export function useProjectHttp(axiosInstance: AxiosInstance) {
    const getProjects = (): Promise<Array<Project>> =>
        axiosInstance.get("/projects")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectByAuth = (): Promise<Project> =>
        axiosInstance.get("/project?filter=auth")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectsFiles = (project: Project): Promise<File[]> =>
        axiosInstance.get(`/projects/${project.key}/file`, {
                responseType: 'arraybuffer'
            })
            .then( async (response: AxiosResponse) => {
                var files = await transformZipToFiles(response.data)
                return files
            })

    const createProject = (project: CreateProject): Promise<Project> =>
        axiosInstance.post("/project", project, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => {
                return response.data
            })

    const saveProjectFile = (
        file: File,
        projectId: string
    ): Promise<void> =>
        axiosInstance.post(`/projects/${projectId}/file`, {
          'file': file
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

    return {
        getProjects,
        getProjectByAuth,
        createProject,
        getProjectsFiles,
        saveProjectFile
    }
}