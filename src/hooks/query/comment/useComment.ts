import { useCommentHttp } from "./useCommentHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import {useAxiosInstance} from "../../../AuthProvider";

const COMMENT_QUERY_KEYS = {
    getTaskComments: getKey('GET', 'TASK-COMMENT', 'MULTIPLE', 'QUERY'),
}

export function useTaskCommentsGet(key: string) {
    const { getTaskComments } = useCommentHttp(useAxiosInstance());

    return useQuery({
        queryKey: [COMMENT_QUERY_KEYS.getTaskComments, key],
        queryFn: () => getTaskComments({ taskKey: key })
    });
}

export function useTaskCommentSave(key: string) {
    const { postTaskComment } = useCommentHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            zippedFiles?: ArrayBuffer,
            text: string,
        }) => postTaskComment(key, variables.text, variables.zippedFiles),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEYS.getTaskComments, key] })
    });
}

export function useTaskCommentUpdate(key: string) {
    const { patchTaskComment } = useCommentHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            commentId: string,
            zippedFiles?: ArrayBuffer,
            text: string,
        }) => patchTaskComment(variables.commentId, variables.text, variables.zippedFiles),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEYS.getTaskComments, key] })
    });
}

export function useCommentFileDelete(taskKey: string) {
    const { deleteCommentFile } = useCommentHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            commentId: string,
            filename: string
        }) =>
            deleteCommentFile(
                variables.commentId,
                variables.filename
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEYS.getTaskComments, taskKey] })
    });
}

export function useCommentDelete(taskKey: string) {
    const { deleteComment } = useCommentHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            commentId: string
        }) =>
            deleteComment(
                variables.commentId
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [COMMENT_QUERY_KEYS.getTaskComments, taskKey] })
    });
}