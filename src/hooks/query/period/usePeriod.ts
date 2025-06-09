import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Project} from "../../../model/project/Project";
import {usePeriodHttp} from "./usePeriodHttp";
import {useCreateAxiosInstance} from "../HttpUtils";

const KEYS = {
    getPeriod: getKey('GET', 'PERIOD', 'SINGLE','QUERY')
}

export function usePeriodGet(project: Project) {
    const { getPeriod } = usePeriodHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getPeriod, project.key],
        queryFn: () => getPeriod(project)
    });
}