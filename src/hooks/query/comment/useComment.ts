import { useCommentHttp } from "./useCommentHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import { useCreateAxiosInstance } from "../HttpUtils";

const KEYS = {
    getTaskComments: getKey('GET', 'TASK-COMMENT', 'MULTIPLE', 'QUERY'),
    saveTaskComment: getKey("POST", 'TASK-COMMENT', 'SINGLE', 'MUTATION'),
    deleteCommentFile: getKey('DELETE', 'COMMENT-FILE', 'SINGLE', 'MUTATION'),
    updateTaskComment: getKey('PATCH', 'TASK-COMMENT', 'SINGLE', 'MUTATION')
}

export function useTaskCommentsGet(key: string) {
    const { getTaskComments } = useCommentHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTaskComments, key],
        queryFn: () => getTaskComments({ taskKey: key })
    });
}

export function useTaskCommentSave(key: string) {
    const { postTaskComment } = useCommentHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.saveTaskComment],
        mutationFn: (variables: {
            zippedFiles?: ArrayBuffer,
            text: string,
        }) => postTaskComment(key, variables.text, variables.zippedFiles),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments, key] })
    });
}

export function useTaskCommentUpdate(key: string) {
    const { patchTaskComment } = useCommentHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.updateTaskComment],
        mutationFn: (variables: {
            commentId: string,
            zippedFiles?: ArrayBuffer,
            text: string,
        }) => patchTaskComment(variables.commentId, variables.text, variables.zippedFiles),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments, key] })
    });
}

export function useCommentFileDelete(taskKey: string) {
    const { deleteCommentFile } = useCommentHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.deleteCommentFile],
        mutationFn: (variables: {
            commentId: string,
            filename: string
        }) =>
            deleteCommentFile(
                variables.commentId,
                variables.filename
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments, taskKey] })
    });
}

export function useCommentDelete(taskKey: string) {
    const { deleteComment } = useCommentHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.deleteCommentFile],
        mutationFn: (variables: {
            commentId: string
        }) =>
            deleteComment(
                variables.commentId
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments, taskKey] })
    });
}