import {useTaskHttp} from "./useTaskHttp";
import {useQuery} from "@tanstack/react-query";
import {getKey} from "./QueryUtility";
import {Project} from "../model/project/Project";
import {Participant} from "../model/participant/Participant";

const KEYS = {
    get: getKey('GET', 'TASK', 'MULTIPLE','QUERY')
}

export function useParticipantsGet() {
    const { getParticipants } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getParticipants,
        initialData: new Array<Participant>()
    });
}