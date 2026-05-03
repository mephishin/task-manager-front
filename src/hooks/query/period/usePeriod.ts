import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {usePeriodHttp} from "./usePeriodHttp";
import {useCreateAxiosInstance} from "../HttpUtils";

const PERIOD_QUERY_KEYS = {
    getPeriod: getKey('GET', 'PERIOD', 'SINGLE','QUERY')
}

export function usePeriodGet(projectId: string) {
    const { getPeriod } = usePeriodHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [PERIOD_QUERY_KEYS.getPeriod, projectId],
        queryFn: () => getPeriod(projectId)
    });
}