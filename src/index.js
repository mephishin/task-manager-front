import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from "./App";
import AuthService from "./pages/AuthService";

const renderApp = () =>
    createRoot(document.getElementById("root"))
        .render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

AuthService.initKeycloak(renderApp);