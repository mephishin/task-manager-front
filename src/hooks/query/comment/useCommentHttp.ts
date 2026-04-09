import {AxiosInstance, AxiosResponse} from "axios";
import {TaskComment} from "../../../model/task/TaskComment";
import {FileDictionary, transformZipToListOfCommentFiles} from "../../../util/ZIp";

export function useCommentHttp(axiosInstance: AxiosInstance) {

    const getTaskComments = (variables: {
        taskKey?: string
    }): Promise<TaskComment[]> =>
        axiosInstance.get(`task/${variables.taskKey}/comment`)
            .then(async (response: AxiosResponse) => {
                if (response.data.length > 0) {
                    const fileDictionary = await getTaskCommentsFiles({ commentIds: response.data.map((taskComment: TaskComment) => taskComment.id) })

                    const res = response.data.map((comment: TaskComment) => {
                        return {
                            ...comment,
                            files: fileDictionary[comment.id] || []
                        }
                    })

                    console.log(res)

                    return res
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
                return await transformZipToListOfCommentFiles(response.data)
            })

    const postTaskComment = (
        taskKey: string,
        text: string,
        zippedFiles?: ArrayBuffer
    ): Promise<void> =>
        axiosInstance.post(`/task/${taskKey}/comment`, {
            zippedFiles: zippedFiles ? new Blob([zippedFiles]) : null,
            text: text,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    const patchTaskComment = (
        commentId: string,
        text: string,
        zippedFiles?: ArrayBuffer
    ): Promise<void> =>
        axiosInstance.patch(`/comment/${commentId}`, {
            zippedFiles: zippedFiles ? new Blob([zippedFiles]) : null,
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
        getTaskComments,
        postTaskComment,
        getTaskCommentsFiles,
        deleteCommentFile,
        deleteComment,
        patchTaskComment
    }
}