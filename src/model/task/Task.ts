export interface Task {
    key: string,
    name: string,
    description: string,
    status: string,
    type: string,
    project: Project,
    assignee: string,
    reporter: string
    created: string,
    edited: string
    total: string
}

export interface Project {
    id: string,
    name: string,
}

