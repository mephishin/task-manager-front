import axios from "axios";

export const getToken = () => axios.post(
    "http://localhost:9090/realms/task-manager/protocol/openid-connect/token",
    {
        code: localStorage.getItem('authCode'),
        client_id: "task-manager-front",
        client_secret: "Wf4STmA2HaNRB6iG7IOqvwFBZuN0uxWt",
        grant_type: "authorization_code"
    },
    {
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    })
    .then(res => res.data);