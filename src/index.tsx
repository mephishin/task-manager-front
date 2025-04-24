import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./App";
import AuthService from "./AuthService";

const renderApp = () =>
    createRoot(document.getElementById("root") as HTMLElement)
        .render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

AuthService.initKeycloak(renderApp);