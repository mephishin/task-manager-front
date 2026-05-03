import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {useUsersHttp} from "./useUsersHttp";
import {useCreateAxiosInstance} from "../HttpUtils";
import {PROJECT_QUERY_KEYS} from "../project/useProject";

const USERS_QUERY_KEYS = {
    get: getKey('GET', 'PARTICIPANT', 'MULTIPLE','QUERY'),
}

export function useUsersByProjectIdGet(projectId?: string) {
    const { getParticipants } = useUsersHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [USERS_QUERY_KEYS.get, projectId],
        queryFn: () => getParticipants(projectId!),
        enabled: !!projectId
    });
}

export function useRemoveUserFromProject(projectId: string) {
    const { removeParticipantFromProject } = useUsersHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => removeParticipantFromProject(userId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.get, projectId] })
            queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEYS.get, projectId] })
        },
    });
}