export interface TasksChart {
    participants: Array<Participant>,
    notAssignedTasks: Array<Task>
}

export interface Participant {
    username: string,
    tasks: Array<Task>
}

export interface Task {
    key: string,
    name: string,
    type: string,
    status: string
}