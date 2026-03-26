export interface TaskComment {
    id: string,
    taskKey: string,
    files: File[],
    author: Author,
    text: string,
    edited: string,
    created: string,
}

export interface Author {
    username: string
}