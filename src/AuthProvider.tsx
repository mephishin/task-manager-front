import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Keycloak from "keycloak-js";

interface AuthContextType {
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    client: Keycloak
    children: ReactNode;
}

export const AuthProvider = ({ children, client }: AuthProviderProps) => {

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
            .map(str => str.slice(client.realm!.length + 1))
    }

    const getTokenParsed = () => client.tokenParsed;

    const isLoggedIn = () => !!client.token;

    const updateToken = (successCallback:any) =>
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

    const hasRole = (role:string) => client.hasRealmRole(role);

    const contextValue = {
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
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};