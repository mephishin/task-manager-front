import {useTaskHttp} from "./useTaskHttp";
import {useQuery} from "@tanstack/react-query";
import {getKey} from "./QueryUtility";
import {Project} from "../model/project/Project";

const KEYS = {
    get: getKey('GET', 'PROJECT', 'MULTIPLE','QUERY')
}

export function useProjectsGet() {
    const { getProjects } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getProjects,
        initialData: new Array<Project>()
    });
}