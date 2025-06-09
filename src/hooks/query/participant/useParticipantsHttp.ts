import {AxiosInstance, AxiosResponse} from "axios";
import {Participant} from "../../../model/participant/Participant";

export function useParticipantsHttp(axiosInstance: AxiosInstance) {
    const getParticipants = (): Promise<Array<Participant>> =>
        axiosInstance.get("/participants")
            .then((response: AxiosResponse) => {
                console.log("Got participants: ")
                console.log(response.data)
                return response.data
            })

    return {
        getParticipants
    }
}