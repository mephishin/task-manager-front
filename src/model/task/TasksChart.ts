export interface TasksChart {
    participants: Array<Participant>,
    notAssignedTasks: Array<Task>
}

export interface Participant {
    username: string,
    firstName: string,
    middleName: string,
    lastName: string,
    group: string,
    tasks: Array<Task>
}

export interface Task {
    key: string,
    name: string,
    type: string,
    status: string
}

export function getLabel(participant: Participant): string {
    return participant.group
        ? participant.lastName + " " + participant.firstName + " " + participant.group
        : participant.lastName + " " + participant.firstName;
}