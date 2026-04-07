export interface CreateProjectRq {
    name: string,
    description: string,
    participants: string[],
    taskPrefix: string,
}