import { useTaskHttp } from "./useTaskHttp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import {TASK_CHART_QUERY_KEYS_KEYS} from "../tasksChart/useTasksChart";
import {useNavigate} from "@tanstack/react-router";
import {useAxiosInstance} from "../../../AuthProvider";

const TASK_QUERY_KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE', 'QUERY'),
    getTask: getKey('GET', 'TASK', 'SINGLE', 'QUERY'),
    getTaskStatuses: getKey('GET', 'TASK-STATUS', 'MULTIPLE', 'QUERY'),
    getTaskTypes: getKey('GET', 'TASK-TYPE', 'MULTIPLE', 'QUERY'),
    getAllowedTaskStatuses: getKey('GET', 'ALLOWED-TASK-STATUS', 'MULTIPLE', 'QUERY'),
    getSearchTasks: getKey('GET', 'SEARCH-TASKS', 'MULTIPLE', 'QUERY'),
}

export function useTaskGet(key: string) {
    const { getTask } = useTaskHttp(useAxiosInstance());

    return useQuery({
        queryKey: [TASK_QUERY_KEYS.getTask, key],
        queryFn: () => getTask(key)
    })
}

export function useSearchTaskGet() {
    const { getTasksToSearch } = useTaskHttp(useAxiosInstance());

    return useQuery({
        queryKey: [TASK_QUERY_KEYS.getSearchTasks],
        queryFn: getTasksToSearch,
    })
}

export function useTaskTypesGet() {
    const { getTaskTypes } = useTaskHttp(useAxiosInstance());

    return useQuery({
        queryKey: [TASK_QUERY_KEYS.getTaskTypes],
        queryFn: getTaskTypes,
    });
}

export function useTaskStatusesGet(key?: string) {
    const { getTaskStatuses } = useTaskHttp(useAxiosInstance());

    return useQuery({
        queryKey: [TASK_QUERY_KEYS.getTaskStatuses, key],
        queryFn: () => getTaskStatuses(key),
    });
}

export function useAllowedTaskStatusesGet(key?: string) {
    const { getAllowedTaskStatuses } = useTaskHttp(useAxiosInstance());

    return useQuery({
        queryKey: [TASK_QUERY_KEYS.getAllowedTaskStatuses, key],
        queryFn: () => getAllowedTaskStatuses({ taskKey: key })
    });
}

export function useTaskCreate() {
    const { postTask } = useTaskHttp(useAxiosInstance());
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: postTask,
        onSuccess: (data) => {
            navigate(`/task/${data}`)
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.getTasksChart] })
        }
    });
}

export function useChangeTaskStatus(key?: string) {
    const { changeTaskStatus } = useTaskHttp(useAxiosInstance());
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.getTasksChart] })
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === TASK_QUERY_KEYS.getAllowedTaskStatuses && query.queryKey[1] === key,
            })
        }
    });
}

export function useCloseTask(key?: string) {
    const { closeTask } = useTaskHttp(useAxiosInstance());
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: closeTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.getTasksChart] })
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.getTask, key] })
        }

    });
}

export function useTaskUpdate(key?: string, projectId?: string) {
    const { putTask } = useTaskHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: putTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEYS.getTask, key] })
            queryClient.invalidateQueries({ queryKey: [TASK_CHART_QUERY_KEYS_KEYS.getTasksChart, projectId] })
        },
    });
}