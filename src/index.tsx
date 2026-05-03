import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./App";
import Keycloak from "keycloak-js";
import {AuthProvider} from "./AuthProvider";

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
                <AuthProvider client={client}>
                    <App />
                </AuthProvider>
            </React.StrictMode>
        );

initKeycloak(renderApp);