export interface CreateTaskRq {
    name: string,
    description: string,
    type: string,
    project: string,
    assignee: string,
}

export interface UpdateTaskRq {
    key: string
    name: string,
    description: string,
    assignee: string,
}