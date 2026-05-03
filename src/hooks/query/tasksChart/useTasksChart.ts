import {getKey} from "../QueryUtility";
import {useTasksChartHttp} from "./useTasksChartHttp";
import {useQuery} from "@tanstack/react-query";

const TASK_CHART_QUERY_KEYS_KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
}

export function useTasksChartGet(projectId?: string) {
    const { getTasksChart } = useTasksChartHttp();

    return useQuery({
        queryKey: [TASK_CHART_QUERY_KEYS_KEYS.getTasksChart, projectId],
        queryFn: () => getTasksChart(projectId)
    })
}