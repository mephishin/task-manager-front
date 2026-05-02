import {AxiosInstance, AxiosResponse} from "axios";
import {Users} from "../../../model/participant/Participant";

export function useUsersHttp(axiosInstance: AxiosInstance) {
    const getParticipantsByProjectId = (projectId: string): Promise<Array<Users>> =>
        axiosInstance.get(`/users?projectId=${projectId}`)
            .then((response: AxiosResponse) => {
                return response.data
            })

    return {
        getParticipants: getParticipantsByProjectId
    }
}