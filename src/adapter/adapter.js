// export const getSomething = () =>
//     fetch("http://localhost:1080/api/v1/books?code=15345", {
//         method: "GET"
//     })
//         .then(response => response.json())
//         .catch(error => console.error(error));

export const getTasks = (projectName) =>
    fetch(`http://localhost:8080/task/${projectName}`, {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.error(error));


export const getTaskStatuses = () =>
    fetch("http://localhost:8080/task/statuses", {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.error(error));

export const getAllProjects = () =>
    fetch("http://localhost:8080/project", {
        method: "GET"
    })
        .then(response => response.json())
        .catch(error => console.error(error))
