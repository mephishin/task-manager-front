import {useTaskHttp} from "./useTaskHttp";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {SearchTask} from "../../../model/task/SearchTask";
import {useCreateAxiosInstance} from "../HttpUtils";

const KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
    getTask: getKey('GET', 'TASK', 'SINGLE','QUERY'),
    getTaskStatuses: getKey('GET', 'TASK-STATUS', 'MULTIPLE','QUERY'),
    getTaskTypes: getKey('GET', 'TASK-TYPE', 'MULTIPLE','QUERY'),
    create: getKey('POST', 'TASK', 'SINGLE', 'MUTATION'),
    update: getKey('UPDATE', 'TASK', 'SINGLE', 'MUTATION'),
    changeTaskStatus: getKey('UPDATE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    closeTask: getKey('DELETE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    getAllowedTaskStatuses: getKey('GET', 'ALLOWED-TASK-STATUS', 'MULTIPLE', 'QUERY'),
    getSearchTasks: getKey('GET', 'SEARCH-TASKS', 'MULTIPLE','QUERY'),
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
        queryFn: () => getAllowedTaskStatuses({taskKey: key})
    });
}

export function useTaskCreate() {
    const { postTask } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.create],
        mutationFn: postTask,
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [KEYS.getTasksChart]})
    });
}

export function useChangeTaskStatus(key?: string) {
    const { changeTaskStatus } = useTaskHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: [KEYS.changeTaskStatus],
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [KEYS.getTasksChart]})
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
            queryClient.invalidateQueries({queryKey: [KEYS.getTasksChart]})
            queryClient.invalidateQueries({queryKey: [KEYS.getTask, key]})
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