import { useNavigate } from "react-router-dom";
import {CircularProgress, Stack } from "@mui/material";
import SearchableList from "./components/SearchableTaskList";
import { useSearchTaskGet } from "../../hooks/query/task/useTask";

export const SearchTaskPage = () => {
    const tasks = useSearchTaskGet()
    const navigate = useNavigate();

    const onSelect = (task: any) => {
        navigate(`/task/${task.id}`)
    }

    if (tasks.data) {
        return (
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <SearchableList
                    options={tasks.data.map(task => { return { id: task.key, name: task.name, project: task.project } })}
                    label="Поиск задачи"
                    onSelect={onSelect}
                />
            </Stack>
        );
    } else return <CircularProgress />
}