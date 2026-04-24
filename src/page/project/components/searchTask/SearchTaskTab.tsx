import SearchableList from "./SearchableTaskList";
import {useSearchTaskGet} from "../../../../hooks/query/task/useTask";

export const SearchTaskTab = () => {
    const tasks = useSearchTaskGet()

    if (tasks.data) {
        return (
            <SearchableList
                options={tasks.data.map(task => {
                    return {id: task.key, name: task.name, status: task.status}
                })}
                label="Поиск задачи"
            />
        );
    }
}