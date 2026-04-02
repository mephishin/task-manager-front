import { useTaskHttp } from "./useTaskHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import { SearchTask } from "../../../model/task/SearchTask";
import { useCreateAxiosInstance } from "../HttpUtils";
import { TaskComment } from "../../../model/task/TaskComment";

const KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE', 'QUERY'),
    getTask: getKey('GET', 'TASK', 'SINGLE', 'QUERY'),
    getTaskStatuses: getKey('GET', 'TASK-STATUS', 'MULTIPLE', 'QUERY'),
    getTaskTypes: getKey('GET', 'TASK-TYPE', 'MULTIPLE', 'QUERY'),
    getTaskComments: getKey('GET', 'TASK-COMMENT', 'MULTIPLE', 'QUERY'),
    saveTaskComment: getKey("POST", 'TASK-COMMENT', 'SINGLE', 'MUTATION'),
    create: getKey('POST', 'TASK', 'SINGLE', 'MUTATION'),
    update: getKey('UPDATE', 'TASK', 'SINGLE', 'MUTATION'),
    changeTaskStatus: getKey('UPDATE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    closeTask: getKey('DELETE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    getAllowedTaskStatuses: getKey('GET', 'ALLOWED-TASK-STATUS', 'MULTIPLE', 'QUERY'),
    getSearchTasks: getKey('GET', 'SEARCH-TASKS', 'MULTIPLE', 'QUERY'),
    getTaskCommentFiles: getKey('GET', 'COMMENT-FILE', 'MULTIPLE', 'QUERY'),
    deleteCommentFile: getKey('DELETE', 'COMMENT-FILE', 'SINGLE', 'MUTATION')
}

export function useTaskGet(key?: string) {
    const { getTask } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTask, key],
        queryFn: () => getTask(key)
    })
}

export function useSearchTaskGet() {
    const { getTasksToSearch } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getSearchTasks],
        queryFn: getTasksToSearch,
        initialData: new Array<SearchTask>()
    })
}

export function useTaskTypesGet() {
    const { getTaskTypes } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTaskTypes],
        queryFn: getTaskTypes,
        initialData: new Array<string>()
    });
}

export function useTaskStatusesGet(key?: string) {
    const { getTaskStatuses } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTaskStatuses, key],
        queryFn: () => getTaskStatuses(key),
        initialData: new Array<string>()
    });
}

export function useAllowedTaskStatusesGet(key?: string) {
    const { getAllowedTaskStatuses } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getAllowedTaskStatuses, key],
        queryFn: () => getAllowedTaskStatuses({ taskKey: key })
    });
}

export function useTaskCommentsGet(key: string) {
    const { getTaskComments } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTaskComments, key],
        queryFn: () => getTaskComments({ taskKey: key })
    });
}

export function useTaskCreate() {
    const { postTask } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.create],
        mutationFn: postTask,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTasksChart] })
    });
}

export function useTaskCommentSave() {
    const { saveTaskComment } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.saveTaskComment],
        mutationFn: (variables: {
            taskKey: string,
            zippedFiles?: ArrayBuffer,
            text: string,
        }) => saveTaskComment(variables.taskKey, variables.text, variables.zippedFiles),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments] })
    });
}

export function useTaskCommentsFilesGet(taskKey: string, commentIds?: string[]) {
    const { getTaskCommentsFiles } = useTaskHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getTaskCommentFiles, taskKey],
        queryFn: () => getTaskCommentsFiles({ commentIds: commentIds }),
        enabled: !!commentIds,
    });
}

export function useChangeTaskStatus(key?: string) {
    const { changeTaskStatus } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: [KEYS.changeTaskStatus],
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [KEYS.getTasksChart] })
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === KEYS.getAllowedTaskStatuses && query.queryKey[1] === key,
            })
        }
    });
}

export function useCloseTask(key?: string) {
    const { closeTask } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: [KEYS.closeTask],
        mutationFn: closeTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [KEYS.getTasksChart] })
            queryClient.invalidateQueries({ queryKey: [KEYS.getTask, key] })
        }

    });
}

export function useTaskUpdate(key?: string) {
    const { putTask } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.update],
        mutationFn: putTask,
        onSuccess: (updatedTask) => {
            queryClient.setQueryData(
                [KEYS.getTask, key],
                updatedTask
            );
        },
    });
}

export function useCommentFileDelete(taskKey: string) {
    const { deleteCommentFile } = useTaskHttp(useCreateAxiosInstance());
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
                    queryClient.invalidateQueries({ queryKey: [KEYS.getTaskCommentFiles, taskKey]})
    });
}

export function useCommentDelete(taskKey: string) {
    const { deleteComment } = useTaskHttp(useCreateAxiosInstance());
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
                    queryClient.invalidateQueries({ queryKey: [KEYS.getTaskComments, taskKey]})
    });
}