import axios, {AxiosResponse} from "axios";
import AuthService from "../../../AuthService";
import {Project} from "../../../model/project/Project";
import {Period} from "../../../model/period/Period";

export function usePeriodHttp() {
    const api = axios.create({
        baseURL: "http://localhost:8080"
    });

    api.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    const getPeriod = (project: Project): Promise<Period> =>
        api.get(`/period?project=${project.name}&active=true`)
            .then((response: AxiosResponse) => {
                console.log(response.data)
                return response.data
            })

    return {
        getPeriod
    }
}