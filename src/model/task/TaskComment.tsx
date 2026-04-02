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
}