import * as React from 'react';
import {createRoot} from 'react-dom/client';
import Keycloak from "keycloak-js";
import {AuthProvider, router} from "./AuthProvider";

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const client = new Keycloak({
    url: "http://localhost:9090",
    realm: "task-manager",
    clientId: "task-manager-front",
});

const initKeycloak = (onAuthenticatedCallback:any) => {
    client
        .init({
            onLoad: "login-required",
        })
        .then((isAuthenticated) => {
            if (!isAuthenticated) {
                console.log("user is not authenticated")
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);

};

const renderApp = () =>
    createRoot(document.getElementById("root") as HTMLElement)
        .render(
            <React.StrictMode>
                {AuthProvider(client)}
            </React.StrictMode>
        );

initKeycloak(renderApp);