import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Keycloak from "keycloak-js";
import {createRouter, RouterProvider} from "@tanstack/react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {routeTree} from "./routeTree.gen";
import axios, {AxiosInstance} from "axios";

export interface AppContextType {
    auth: {
        isLoggedIn: () => boolean;

        login: () => Promise<void>;
        logout: () => void;

        PARTICIPANT_ROLE: string;
        LEADER_ROLE: string;
        ADMIN_ROLE: string;

        getToken: () => string | undefined;
        getTokenParsed: () => any;
        getUsername: () => string;
        getFirstName: () => string;
        getMiddleName: () => string | undefined;
        getLastName: () => string;
        getGroup: () => string | undefined;
        getFullName: () => string;
        getId: () => string;

        hasRole: (role: string) => boolean;
        realmAccess: () => any;
        getRoles: () => string[] | undefined;

        updateToken: (successCallback?: () => void) => Promise<void | boolean>;
    },
    axiosInstance: AxiosInstance,
    queryClient: QueryClient
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const router = (appContext: AppContextType) => {
    return createRouter({
        routeTree,
        context: appContext,
        defaultPreload: 'intent',
        scrollRestoration: true,
    });
}

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export const AuthProvider = (client: Keycloak) => {
    const PARTICIPANT_ROLE = 'task-manager_participant'
    const LEADER_ROLE = 'task-manager_leader'
    const ADMIN_ROLE = 'task-manager_admin'

    const login = client.login;

    const logout = client.logout;

    const getToken = () => client.token;

    const realmAccess = () => client.realmAccess

    const getRoles = () => {
        return client.realmAccess?.roles
            .filter(str => str.startsWith(client.realm!))

    }

    const getTokenParsed = () => client.tokenParsed;

    const isLoggedIn = () => !!client.token;

    const updateToken = (successCallback: any) =>
        client.updateToken(1)
            .then(successCallback)
            .catch(login);

    const getUsername = () => client.tokenParsed?.preferred_username!;

    const getFirstName = () => client.tokenParsed?.first_name!;
    const getMiddleName = () => client.tokenParsed?.middle_name;
    const getLastName = () => client.tokenParsed?.last_name!;
    const getGroup = () => client.tokenParsed?.group;

    const getFullName = () => getGroup()
        ? getLastName() + " " + getFirstName() + " " + getGroup()
        : getLastName() + " " + getFirstName();

    const getId = () => client.tokenParsed?.sub!;

    const hasRole = (role: string) => client.hasRealmRole(role);

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080"
    });

    axiosInstance.interceptors.request.use(async (config: any) => {
        if (isLoggedIn()) {
            await updateToken(() => config.headers.Authorization = `Bearer ${getToken()}`)
            return config
        }
    })

    const queryClient = new QueryClient()

    const contextValue = {
        auth: {
            isLoggedIn,

            login,
            logout,

            getToken,
            getTokenParsed,
            updateToken,
            getUsername,
            hasRole,
            realmAccess,
            getRoles,
            getId,

            PARTICIPANT_ROLE,
            LEADER_ROLE,
            ADMIN_ROLE,

            getFirstName,
            getMiddleName,
            getLastName,
            getFullName,
            getGroup,
        },
        axiosInstance: axiosInstance,
        queryClient: queryClient
    };

    return (
        <AppContext.Provider value={contextValue}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router(contextValue)}/>
            </QueryClientProvider>
        </AppContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context.auth;
};

export const useAxiosInstance = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context.axiosInstance;
};

