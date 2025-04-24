import Keycloak from "keycloak-js";

const client = new Keycloak({
    url: "http://localhost:9090",
    realm: "task-manager",
    clientId: "task-manager",
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

const doLogin = client.login;

const doLogout = client.logout;

const getToken = () => client.token;

const getTokenParsed = () => client.tokenParsed;

const isLoggedIn = () => !!client.token;

const updateToken = (successCallback:any) =>
    client.updateToken(1)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => client.tokenParsed?.preferred_username;

const hasRole = (roles:any) => roles.some((role:any) => client.hasRealmRole(role));

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
}

export default AuthService;