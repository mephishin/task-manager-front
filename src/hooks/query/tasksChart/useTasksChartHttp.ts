import axios from "axios";
import AuthService from "../../../AuthService";
import {TasksChart} from "../../../model/task/TasksChart";
import {AxiosResponse} from "axios";

export function useTasksChartHttp() {
    const api = axios.create({
        baseURL: "http://localhost:8080"
    });

    api.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    const getTasksChart = (projectName?: string): Promise<TasksChart> =>
        api.get<TasksChart>(projectName ? `/tasksChart?project=${projectName}` : `/tasksChart`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    return {
        getTasksChart
    }
}