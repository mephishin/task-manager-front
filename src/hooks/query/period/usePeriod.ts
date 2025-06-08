import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Project} from "../../../model/project/Project";
import {usePeriodHttp} from "../../http/period/usePeriodHttp";

const KEYS = {
    getPeriod: getKey('GET', 'PERIOD', 'SINGLE','QUERY')
}

export function usePeriodGet(project: Project) {
    const { getPeriod } = usePeriodHttp();

    return useQuery({
        queryKey: [KEYS.getPeriod, project.key],
        queryFn: () => getPeriod(project)
    });
}