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
        | 'PROJECT-FILE',
    singleOrMultiple: 'SINGLE' | 'MULTIPLE',
    type: 'MUTATION' | 'QUERY'
) => `${key}_${entity}_${singleOrMultiple}_${type}`;
