import {useQuery} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {Users} from "../../../model/participant/Participant";
import {useUsersHttp} from "./useUsersHttp";
import {useCreateAxiosInstance} from "../HttpUtils";

const KEYS = {
    get: getKey('GET', 'PARTICIPANT', 'MULTIPLE','QUERY')
}

export function useUsersByProjectIdGet(projectId?: string) {
    const { getParticipants } = useUsersHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: () => getParticipants(projectId!),
        enabled: !!projectId
    });
}