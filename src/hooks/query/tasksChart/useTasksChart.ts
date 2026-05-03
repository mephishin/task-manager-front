import {getKey} from "../QueryUtility";
import {useTasksChartHttp} from "./useTasksChartHttp";
import {useQuery} from "@tanstack/react-query";
import {useCreateAxiosInstance} from "../HttpUtils";

const TASK_CHART_QUERY_KEYS_KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
}

export function useTasksChartGet(projectId?: string) {
    const { getTasksChart } = useTasksChartHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [TASK_CHART_QUERY_KEYS_KEYS.getTasksChart, projectId],
        queryFn: () => getTasksChart(projectId)
    })
}