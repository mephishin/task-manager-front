import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NavigationAppBar} from "./components/bar/NavigationAppBar";
import {NoPage} from "./pages/NoPage";
import {TaskPage} from "./pages/TaskPage";
import {ProjectPage} from "./pages/ProjectPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigationAppBar />}>
                    <Route index element={<Navigate to={"/project"} />} />
                    <Route path="/project" element={<ProjectPage />} />
                    <Route path="/task/:key" element={<TaskPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}