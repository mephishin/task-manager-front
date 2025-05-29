import {useTaskHttp} from "./useTaskHttp";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getKey} from "./QueryUtility";

const KEYS = {
    getTask: getKey('GET', 'TASK', 'SINGLE','QUERY'),
    getTasks: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
    getTaskStatuses: getKey('GET', 'TASK-STATUS', 'MULTIPLE','QUERY'),
    getTaskTypes: getKey('GET', 'TASK-TYPE', 'MULTIPLE','QUERY'),
    create: getKey('POST', 'TASK', 'SINGLE', 'MUTATION'),
    update: getKey('UPDATE', 'TASK', 'SINGLE', 'MUTATION'),
    changeTaskStatus: getKey('UPDATE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    closeTask: getKey('DELETE', 'TASK-STATUS', 'SINGLE', 'MUTATION'),
    getAllowedTaskStatuses: getKey('GET', 'ALLOWED-TASK-STATUS', 'MULTIPLE', 'QUERY')
}

export function useTaskGet(key?: string) {
    const { getTask } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getTask, key],
        queryFn: () => getTask(key)
    })
}

export function useTasksGet(projectName?: string) {
    const { getTasks } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getTasks, projectName],
        queryFn: () => getTasks(projectName)
    })
}

export function useTaskTypesGet() {
    const { getTaskTypes } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getTaskTypes],
        queryFn: getTaskTypes
    });
}

export function useTaskStatusesGet() {
    const { getTaskStatuses } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getTaskStatuses],
        queryFn: getTaskStatuses,
        initialData: new Array<string>()
    });
}

export function useAllowedTaskStatusesGet(key?: string) {
    const { getAllowedTaskStatuses } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getAllowedTaskStatuses, key],
        queryFn: () => getAllowedTaskStatuses({taskKey: key})
    });
}

export function useTaskCreate() {
    const { postTask } = useTaskHttp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.create],
        mutationFn: postTask,
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [KEYS.getTasks]})
    });
}

export function useChangeTaskStatus(key?: string) {
    const { changeTaskStatus } = useTaskHttp();
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: [KEYS.changeTaskStatus],
        mutationFn: changeTaskStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [KEYS.getTasks]})
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === KEYS.getAllowedTaskStatuses && query.queryKey[1] === key,
            })
        }
    });
}

export function useCloseTask(key?: string) {
    const { closeTask } = useTaskHttp();
    const queryClient = useQueryClient();


    return useMutation({
        mutationKey: [KEYS.closeTask],
        mutationFn: closeTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [KEYS.getTasks]})
            queryClient.invalidateQueries({queryKey: [KEYS.getTask, key]})
        }

    });
}

export function useTaskUpdate(key?: string) {
    const { putTask } = useTaskHttp();
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