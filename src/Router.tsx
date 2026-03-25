import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NoPage} from "./page/NoPage";
import { ProjectPage } from "./page/project/ProjectPage";
import { NavigationAppBar } from "./page/bar/NavigationAppBar";
import { TaskPage } from "./page/task/TaskPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigationAppBar />}>
                    <Route path="/project/:projectId" element={<ProjectPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/task/:key" element={<TaskPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}