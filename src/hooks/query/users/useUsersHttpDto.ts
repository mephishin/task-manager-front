export interface Users {
    id: string,
    username: string,
    firstName: string,
    middleName: string,
    lastName: string,
    group: string,
    project: string
}

export function getLabel(participant: Users): string {
    return participant.group
    ? participant.lastName + " " + participant.firstName + " " + participant.group
    : participant.lastName + " " + participant.firstName;
}