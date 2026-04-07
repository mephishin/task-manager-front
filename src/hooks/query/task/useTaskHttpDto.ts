export interface CreateTaskRq {
    name: string,
    description: string,
    type: string,
    project: string,
    assignee: string,
}