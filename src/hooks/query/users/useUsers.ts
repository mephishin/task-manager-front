import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {useUsersHttp} from "./useUsersHttp";
import {PROJECT_QUERY_KEYS} from "../project/useProject";
import {useAxiosInstance} from "../../../AuthProvider";

const USERS_QUERY_KEYS = {
    get: getKey('GET', 'PARTICIPANT', 'MULTIPLE','QUERY'),
}

export function useUsersByProjectIdGet(projectId?: string) {
    const { getParticipants } = useUsersHttp(useAxiosInstance());

    return useQuery({
        queryKey: [USERS_QUERY_KEYS.get, projectId],
        queryFn: () => getParticipants(projectId!),
        enabled: !!projectId
    });
}

export function useRemoveUserFromProject(projectId: string) {
    const { removeParticipantFromProject } = useUsersHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => removeParticipantFromProject(userId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEYS.get, projectId] })
            queryClient.invalidateQueries({ queryKey: [PROJECT_QUERY_KEYS.get, projectId] })
        },
    });
}