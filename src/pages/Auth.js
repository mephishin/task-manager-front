import {useNavigate, useSearchParams} from "react-router-dom";
import {Typography} from "@mui/material";
import {useEffect} from "react";
import {getToken} from "../adapter/keycloak";

export const Auth = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        localStorage.setItem("authCode", searchParams.get("code"))
        getToken().then(data => {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token)
        })
        navigate('/tasks')
    });

    return (
        <Typography>Auth</Typography>
    )
}