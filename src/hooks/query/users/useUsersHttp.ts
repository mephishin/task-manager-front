import {AxiosInstance, AxiosResponse} from "axios";
import {Users} from "../../../model/participant/Participant";

export function useUsersHttp(axiosInstance: AxiosInstance) {
    const getParticipants = (): Promise<Array<Users>> =>
        axiosInstance.get("/users")
            .then((response: AxiosResponse) => {
                console.log("Got users: ")
                console.log(response.data)
                return response.data
            })

    return {
        getParticipants
    }
}