import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation/Navigation";
import {NoPage} from "./pages/NoPage";
import {TasksByProjectPage} from "./pages/TasksByProjectPage";
import {TaskPage} from "./pages/TaskPage";
import {TasksPage} from "./pages/TasksPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Navigate to="/tasks" />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/tasks/:project" element={<TasksByProjectPage />} />
                    <Route path="/tasks/:project/:key" element={<TaskPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}