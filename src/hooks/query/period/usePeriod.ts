import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {usePeriodHttp} from "./usePeriodHttp";
import {useAxiosInstance} from "../../../AuthProvider";

const PERIOD_QUERY_KEYS = {
    getPeriod: getKey('GET', 'PERIOD', 'SINGLE','QUERY')
}

export function usePeriodGet(projectId: string) {
    const { getPeriod } = usePeriodHttp(useAxiosInstance());

    return useQuery({
        queryKey: [PERIOD_QUERY_KEYS.getPeriod, projectId],
        queryFn: () => getPeriod(projectId)
    });
}