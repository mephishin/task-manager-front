import axios, {AxiosResponse} from "axios";
import AuthService from "../../../AuthService";
import {Participant} from "../../../model/participant/Participant";

export function useParticipantsHttp() {
    const api = axios.create({
        baseURL: "http://localhost:8080"
    });

    api.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    const getParticipants = (): Promise<Array<Participant>> =>
        api.get("/participants")
            .then((response: AxiosResponse) => response.data)

    return {
        getParticipants
    }
}