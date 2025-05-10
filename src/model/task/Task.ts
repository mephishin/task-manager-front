export interface Task {
    key: string,
    name: string,
    description: string,
    status: string,
    type: string,
    project: string,
    assignee: string,
    reporter: string
    created: string,
    edited: string
}

export interface UpdateTask {
    key?: string,
    name?: string,
    description?: string,
    status?: string,
    type?: string,
    assignee?: string
}

