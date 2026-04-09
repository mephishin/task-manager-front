export interface TaskComment {
    id: string,
    taskKey: string,
    files: File[],
    author: Author,
    text: string,
    edited: Date,
    created: Date,
}

export interface Author {
    username: string
    firstName: string,
    middleName: string,
    lastName: string,
    group: string,
}

export function getLabel(participant: Author): string {
    return participant.group
        ? participant.lastName + " " + participant.firstName + " " + participant.group
        : participant.lastName + " " + participant.firstName;
}