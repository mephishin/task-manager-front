import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://localhost:9090",
    realm: "task-manager",
    clientId: "task-manager-front",
});

export const useAuth = () => {
    const isRun = useRef(false);
    const [token, setToken] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;
        client
            .init({
                onLoad: "login-required",
            })
            .then((res) => {
                setLogin(res);
                setToken(client.token);
                localStorage.setItem("token", client.token)
            });
    }, []);
    return [isLogin, token];
};
