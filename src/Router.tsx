import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation/Navigation";
import {NoPage} from "./pages/NoPage";
import {TaskPage} from "./pages/TaskPage";
import {ProjectPage} from "./pages/ProjectPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Navigate to={"/project"} />} />
                    <Route path="/project" element={<ProjectPage />} />
                    <Route path="/project/:project" element={<ProjectPage />} />
                    <Route path="/task/:key" element={<TaskPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}