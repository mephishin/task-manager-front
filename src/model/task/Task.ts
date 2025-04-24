export interface Task {
    key: string,
    name: string,
    description: string,
    status: string,
    type: string,
    project: string,
    assignee: string,
    reporter: string
}

export interface CreateTask {
    name: string,
    description: string,
    status: string,
    type: string,
    project: string,
    assignee: string
}

export interface UpdateTask {
    key?: string,
    name: string,
    description: string,
    status: string,
    type: string,
    assignee: string
}

