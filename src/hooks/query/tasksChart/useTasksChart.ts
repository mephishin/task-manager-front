import {Project} from "../../../model/project/Project";
import {getKey} from "../QueryUtility";
import {useTasksChartHttp} from "./useTasksChartHttp";
import {useQuery} from "@tanstack/react-query";

const KEYS = {
    getTasksChart: getKey('GET', 'TASK', 'MULTIPLE','QUERY'),
}

export function useTasksChartGet(project?: Project) {
    const { getTasksChart } = useTasksChartHttp();

    return useQuery({
        queryKey: [KEYS.getTasksChart, project?.name],
        queryFn: () => getTasksChart(project?.name)
    })
}