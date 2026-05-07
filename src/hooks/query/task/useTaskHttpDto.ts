export interface CreateTaskRq {
    name: string,
    description: string,
    assignee?: string,
    project: string,
}

export interface UpdateTaskRq {
    key: string
    name: string,
    description: string,
    assignee: string | null,
}