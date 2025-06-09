import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Participant} from "../../../model/participant/Participant";
import {useParticipantsHttp} from "./useParticipantsHttp";
import {useCreateAxiosInstance} from "../HttpUtils";

const KEYS = {
    get: getKey('GET', 'PARTICIPANT', 'MULTIPLE','QUERY')
}

export function useParticipantsGet() {
    const { getParticipants } = useParticipantsHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getParticipants,
        initialData: new Array<Participant>()
    });
}