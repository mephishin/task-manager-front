export const getKey = (
    key: string,
    entity: 'TASK' | 'TASK-STATUS' | 'TASK-TYPE' | 'PROJECT' | 'PARTICIPANT' | 'ALLOWED-TASK-STATUS' | 'SEARCH-TASKS',
    singleOrMultiple: 'SINGLE' | 'MULTIPLE',
    type: 'MUTATION' | 'QUERY'
) => `${key}_${entity}_${singleOrMultiple}_${type}`;
