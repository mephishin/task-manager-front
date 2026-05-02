import type from "ajv/lib/vocabularies/jtd/type";

export const getKey = (
    key: string,
    entity: 'TASK'
        | 'TASK-STATUS'
        | 'TASK-TYPE'
        | 'TASK-COMMENT'
        | 'COMMENT-FILE'
        | 'PROJECT'
        | 'PARTICIPANT'
        | 'ALLOWED-TASK-STATUS'
        | 'SEARCH-TASKS'
        | 'PERIOD'
        | 'PROJECT-INVITE'
        | 'PROJECT-FILE',
    singleOrMultiple: 'SINGLE' | 'MULTIPLE',
    type: 'MUTATION' | 'QUERY'
) => `${key}_${entity}_${singleOrMultiple}_${type}`;
