import axios, {AxiosInstance} from "axios";
import {TasksChart} from "../../../model/task/TasksChart";
import {AxiosResponse} from "axios";

export function useTasksChartHttp(axiosInstance: AxiosInstance) {

    const getTasksChart = (projectId?: string): Promise<TasksChart> =>
        axiosInstance.get<TasksChart>(projectId ? `/tasksChart?projectId=${projectId}` : `/tasksChart`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    return {
        getTasksChart
    }
}