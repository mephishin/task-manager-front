import {AxiosInstance, AxiosResponse} from "axios";
import {Users} from "./useUsersHttpDto";

export function useUsersHttp(axiosInstance: AxiosInstance) {
    const getParticipantsByProjectId = (projectId: string): Promise<Array<Users>> =>
        axiosInstance.get(`/users?projectId=${projectId}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    const removeParticipantFromProject = (userId: string): Promise<void> =>
        axiosInstance.delete(`/users/${userId}/project`)

    return {
        getParticipants: getParticipantsByProjectId,
        removeParticipantFromProject
    }
}