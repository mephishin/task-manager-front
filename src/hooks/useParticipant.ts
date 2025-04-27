import {useTaskHttp} from "./useTaskHttp";
import {useQuery} from "@tanstack/react-query";
import {getKey} from "./QueryUtility";

const KEYS = {
    get: getKey('GET', 'TASK', 'MULTIPLE','QUERY')
}

export function useParticipantsGet() {
    const { getParticipants } = useTaskHttp();

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getParticipants
    });
}