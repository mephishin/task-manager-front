import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NoPage } from "./page/NoPage";
import { ProjectPage } from "./page/project/ProjectPage";
import { NavigationAppBar } from "./page/bar/NavigationAppBar";
import { TaskPage } from "./page/task/TaskPage";
import { SearchProjectPage } from "./page/searchProject/SearchProjectPage";
import { useAuthParticipantProjectGet } from "./hooks/query/project/useProject";
import { SearchTaskPage } from "./page/searchTask/SearchTaskPage";

export const Router = () => {
    const authUsersProject = useAuthParticipantProjectGet();

    if (!authUsersProject.isPending && authUsersProject.data) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavigationAppBar />}>
                        <Route index element={
                            <Navigate to={`/project/${authUsersProject.data.key}/${authUsersProject.data.name}`} />
                            } />
                        <Route path="/project/:projectId/:projectName" element={<ProjectPage />} />
                        <Route path="/projectSearch" element={<SearchProjectPage />} />
                        <Route path="/taskSearch" element={<SearchTaskPage />} />
                        <Route path="*" element={<NoPage />} />
                        <Route path="/task/:key" element={<TaskPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

}