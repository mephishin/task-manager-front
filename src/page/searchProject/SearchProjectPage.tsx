import { useNavigate } from "react-router-dom";
import { useProjectsGet } from "../../hooks/query/project/useProject";
import {CircularProgress, Stack } from "@mui/material";
import SearchableList from "./components/SearchableList";

export const SearchProjectPage = () => {
    const projects = useProjectsGet();
    const navigate = useNavigate();

    const onSelect = (project: any) => {
        navigate(`/project/${project.id}/${project.label}`)
    }

    if (projects.data) {
        return (
            <Stack sx={{ backgroundColor: "white", margin: 5, borderRadius: 5 }}>
                <SearchableList
                    options={projects.data.map(project => { return { id: project.key, label: project.name } })}
                    label="Поиск проекта"
                    onSelect={onSelect}
                />
            </Stack>
        );
    } else return <CircularProgress />
}