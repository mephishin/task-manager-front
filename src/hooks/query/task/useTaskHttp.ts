import { Task } from "../../../model/task/Task";
import { AxiosInstance, AxiosResponse } from "axios";
import { SearchTask } from "../../../model/task/SearchTask";
import { UpdateTask } from "../../../model/task/UpdateTask";
import { TaskComment } from "../../../model/task/TaskComment";
import { FileDictionary, transformZipToListOfCommentFiles } from "../../../util/ZIp";
import { CreateTaskRq } from "./useTaskHttpDto";

export function useTaskHttp(axiosInstance: AxiosInstance) {
    const getTasksToSearch = (): Promise<SearchTask[]> =>
        axiosInstance.get("/task/search")
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskStatuses = (projectKey: string | undefined): Promise<string[]> =>
        axiosInstance.get(`/status/${projectKey}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskTypes = (): Promise<string[]> =>
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

    const postTask = (task: CreateTaskRq): Promise<Task> =>
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
    }): Promise<string[]> =>
        axiosInstance.get(`task/${variables.taskKey}/statuses?allowed=true`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const getTaskComments = (variables: {
        taskKey?: string
    }): Promise<TaskComment[]> =>
        axiosInstance.get(`task/${variables.taskKey}/comment`)
            .then(async (response: AxiosResponse) => {
                if (response.data.length > 0) {
                    const fileDictionary = await getTaskCommentsFiles({ commentIds: response.data.map((taskComment: TaskComment) => taskComment.id) })
                    return response.data.map((comment: TaskComment) => {
                        return {
                            ...comment,
                            files: fileDictionary[comment.id] || []
                        }
                    })
                } else {
                    return []
                }
            })

    const getTaskCommentsFiles = (variables: {
        commentIds: string[]
    }): Promise<FileDictionary> =>
        axiosInstance.get(`/comment/file`, {
            params: {
                commentIds: variables.commentIds
            },
            responseType: 'arraybuffer'
        })
            .then(async (response: AxiosResponse) => {
                var files = await transformZipToListOfCommentFiles(response.data)
                return files
            })

    const saveTaskComment = (
        taskKey: string,
        text: string,
        zippedFiles?: ArrayBuffer
    ): Promise<void> =>
        zippedFiles ? axiosInstance.post(`/task/${taskKey}/comment`, {
            zippedFiles: new Blob([zippedFiles]),
            text: text,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }) : axiosInstance.post(`/task/${taskKey}/comment`, {
            text: text,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    const deleteCommentFile = (
        commentId: string,
        filename: string
    ): Promise<void> =>
        axiosInstance.delete(`/comment/${commentId}/file/${filename}`)

    const deleteComment = (
        commentId: string
    ): Promise<void> =>
        axiosInstance.delete(`/comment/${commentId}`)

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
        saveTaskComment,
        getTaskCommentsFiles,
        deleteCommentFile,
        deleteComment
    }
}