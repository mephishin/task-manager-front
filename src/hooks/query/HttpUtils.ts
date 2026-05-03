import axios from "axios";
import {useAuthService} from "../../AuthProvider";

export function useCreateAxiosInstance() {
    const {updateToken, getToken, isLoggedIn} = useAuthService();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    axiosInstance.interceptors.request.use(async (config: any) => {
        if (isLoggedIn()) {
            await updateToken(() => config.headers.Authorization = `Bearer ${getToken()}`)
            return config
        }
    })

    return axiosInstance
}