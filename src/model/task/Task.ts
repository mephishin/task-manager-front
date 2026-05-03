import {Users} from "../../hooks/query/users/Participant";

export interface Task {
    key: string,
    name: string,
    description: string,
    status: string,
    type: string,
    project: Project,
    assignee: Assignee,
    reporter: string
    created: string,
    edited: string
    total: string
}

export interface Project {
    id: string,
    name: string,
}

export interface Assignee {
    id: string,
    username: string,
    firstName: string,
    middleName: string,
    lastName: string,
    group: string,
    project: string
}

export function getLabel(participant?: Assignee): string {
    return participant?.group
        ? participant.lastName + " " + participant.firstName + " " + participant.group
        : participant?.lastName + " " + participant?.firstName;
}

