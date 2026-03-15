import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://localhost:9090",
    realm: "task-manager",
    clientId: "task-manager-front",
});

const PARTICIPANT_ROLE = 'task-manager_participant'
const LEADER_ROlE = 'task-manager_leader'

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

const doLogin = client.login;

const doLogout = client.logout;

const getToken = () => client.token;

const realmAccess = () => client.realmAccess

const getRoles = () => client.realmAccess?.roles
    .filter(str => str.startsWith(client.realm!))
    .map(str => str.slice(client.realm!.length + 1))

const getTokenParsed = () => client.tokenParsed;

const isLoggedIn = () => !!client.token;

const updateToken = (successCallback:any) =>
    client.updateToken(1)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => client.tokenParsed?.preferred_username;

const hasRole = (role:string) => client.hasRealmRole(role);

const AuthService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    getTokenParsed,
    updateToken,
    getUsername,
    hasRole,
    realmAccess,
    getRoles,
    PARTICIPANT_ROLE,
    LEADER_ROlE,
}

export default AuthService;