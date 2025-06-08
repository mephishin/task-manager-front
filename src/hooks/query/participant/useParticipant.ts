import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Participant} from "../../../model/participant/Participant";
import {useParticipantsHttp} from "../../http/participant/useParticipantsHttp";

const KEYS = {
    get: getKey('GET', 'TASK', 'MULTIPLE','QUERY')
}

export function useParticipantsGet() {
    const { getParticipants } = useParticipantsHttp();

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getParticipants,
        initialData: new Array<Participant>()
    });
}