import axios, {AxiosInstance, AxiosResponse} from "axios";
import {transformZipToFiles} from "../../../util/ZIp";
import {CreateProjectRq, Project} from "./useProjectHttpDto";
import {files} from "jszip";

export function useProjectHttp(axiosInstance: AxiosInstance) {
    const getProjects = (): Promise<Array<Project>> =>
        axiosInstance.get("/project")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectByAuth = (): Promise<Project> =>
        axiosInstance.get("/project?filter=auth")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectById = (projectId: string): Promise<Project> =>
        axiosInstance.get(`/project/${projectId}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectInviteByProjectId = (projectId: string): Promise<String> =>
        axiosInstance.get(`/project/${projectId}/invite`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const acceptProjectInvite = (
        inviteKey: string,
    ): Promise<string> =>
        axiosInstance.put(`/project/acceptInvite/${inviteKey}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getProjectsFiles = (projectId: string): Promise<File[]> =>
        axiosInstance.get(`/project/${projectId}/file`, {
            responseType: 'arraybuffer'
        })
            .then(async (response: AxiosResponse) => {
                var files = await transformZipToFiles(response.data)
                return files
            })

    const createProject = (project: CreateProjectRq): Promise<Project> =>
        axiosInstance.post("/project", project, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response: AxiosResponse) => {
                return response.data
            })

    const updateProject = (
        description: string,
        projectId: string,
        files?: ArrayBuffer
    ): Promise<void> =>
        axiosInstance.put(`/project/${projectId}`, {
            zippedFiles: files ? new Blob([files]) : null,
            description: description
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    const deleteProjectFile = (
        projectId: string,
        filename: string
    ): Promise<void> =>
        axiosInstance.delete(`/project/${projectId}/file`, {
            data: axios.toFormData({"filename": filename}),
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    return {
        getProjects,
        getProjectByAuth,
        createProject,
        getProjectsFiles,
        updateProject,
        deleteProjectFile,
        getProjectById,
        getProjectInviteByProjectId,
        acceptProjectInvite,
    }
}