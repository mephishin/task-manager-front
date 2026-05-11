export interface CreateProjectRq {
    name: string,
    description: string,
    leader: string,
    taskPrefix: string,
}

export interface Participant {
    id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    group: string,
    roles: string[],
}

export function getLabel(participant: Participant): string {
    return participant.group
        ? participant.lastName + " " + participant.firstName + " " + participant.group
        : participant.lastName + " " + participant.firstName;
}

export interface Project {
    key: string,
    name: string,
    description: string,
    participants: Participant[]
}

export interface ProjectInviteRs {
    key: string,
    projectId: string,
}