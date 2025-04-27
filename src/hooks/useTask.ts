import {useTaskHttp} from "./useTaskHttp";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreateTask} from "../model/task/Task";
import {getKey} from "./QueryUtility";

const KEYS = {
    getTask: getKey('GET', 'TASK', 'SINGLE','QUERY'),
    getTasks: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
    getTaskStatuses: getKey('GET', 'TASK-STATUS', 'MULTIPLE','QUERY'),
    getTaskTypes: getKey('GET', 'TASK-TYPE', 'MULTIPLE','QUERY'),
    create: getKey('CREATE', 'TASK', 'SINGLE', 'MUTATION'),
    update: getKey('UPDATE', 'TASK', 'SINGLE', 'MUTATION')
}

export function useTaskGet(key: string | undefined) {
    const { getTask } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.getTask, key],
        queryFn: () => getTask(key)
    })
}

export function useTasksGet(projectName: string | undefined) {
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
        queryFn: getTaskStatuses
    });
}

export function useTaskCreate() {
    const { postTask } = useTaskHttp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.create],
        mutationFn: (task: CreateTask) => postTask(task),
        // onSuccess: (createdTask) => {
        //     queryClient.setQueryData<Task | undefined>(
        //         [KEYS.getTasks],
        //         //НУЖНО СДЕЛАТЬ ОБНОВЛЕНИЕ КВЕРИ СО СТРАНИЦЕЙ тасков
        //         (prev: TasksPage) => {}
        //     );
        // },
    });
}

export function useTaskUpdate() {
    const { putTask } = useTaskHttp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.update],
        mutationFn: putTask,
        onSuccess: (updatedTask) => {
            queryClient.setQueryData(
                [KEYS.getTask],
                () => updatedTask
            );
        },
    });
}