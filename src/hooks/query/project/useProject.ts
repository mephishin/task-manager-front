import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Project} from "../../../model/project/Project";
import {useProjectHttp} from "../../http/project/useProjectHttp";

const KEYS = {
    getAll: getKey('GET', 'PROJECT', 'MULTIPLE','QUERY'),
    get: getKey('GET', 'PROJECT', 'SINGLE','QUERY')

}

export function useProjectsGet() {
    const { getProjects } = useProjectHttp();

    return useQuery({
        queryKey: [KEYS.getAll],
        queryFn: getProjects,
        initialData: new Array<Project>()
    });
}

export function useAuthParticipantProjectGet() {
    const { getProjectByAuth } = useProjectHttp();

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getProjectByAuth
    });
}