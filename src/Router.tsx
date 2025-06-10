import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NavigationAppBar} from "./components/bar/NavigationAppBar";
import {NoPage} from "./page/NoPage";
import {TaskPage} from "./page/TaskPage";
import {ProjectPage} from "./page/ProjectPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigationAppBar />}>
                    <Route index element={<Navigate to={"/project"} />} />
                    <Route path="/project" element={<ProjectPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                <Route path="/task/:key" element={<TaskPage />} />
            </Routes>
        </BrowserRouter>
    )
}