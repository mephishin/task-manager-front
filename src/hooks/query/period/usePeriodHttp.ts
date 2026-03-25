import {AxiosInstance, AxiosResponse} from "axios";
import {Project} from "../../../model/project/Project";
import {Period} from "../../../model/period/Period";

export function usePeriodHttp(axiosInstance: AxiosInstance) {

    const getPeriod = (projectId: string): Promise<Period> =>
        axiosInstance.get(`/period?projectId=${projectId}&active=true`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    return {
        getPeriod
    }
}