import SearchableList from "./SearchableTaskList";
import {useTasks} from "../../../../hooks/query/task/useTask";
import {getLabel} from "../../../../model/task/Task";

interface SearchTaskTabProps {
    projectId: string;
}

export const SearchTaskTab = ({projectId}: SearchTaskTabProps) => {
    const tasks = useTasks(projectId)

    if (tasks.data) {
        return (
            <SearchableList
                options={tasks.data.map(task => {
                    return {
                        id: task.key,
                        name: task.name,
                        status: task.status,
                        assignee: task.assignee ? getLabel(task.assignee) : ""
                    }
                })}
                label="Поиск задачи"
            />
        );
    }
}