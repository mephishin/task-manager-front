import axios from "axios";
import AuthService from "../../AuthService";

export function useCreateAxiosInstance() {
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    axiosInstance.interceptors.request.use(async (config: any) => {
        if (AuthService.isLoggedIn()) {
            await AuthService.updateToken(() => config.headers.Authorization = `Bearer ${AuthService.getToken()}`)
            return config
        }
    })

    return axiosInstance
}