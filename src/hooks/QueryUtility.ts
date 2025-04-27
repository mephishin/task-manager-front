export const getKey = (
    key: string,
    entity: 'TASK' | 'TASK-STATUS' | 'TASK-TYPE' | 'PROJECT' | 'PARTICIPANT',
    singleOrMultiple: 'SINGLE' | 'MULTIPLE',
    type: 'MUTATION' | 'QUERY'
) => `${key}_${entity}_${singleOrMultiple}_${type}`;
