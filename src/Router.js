import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation/Navigation";
import {NoPage} from "./pages/NoPage";
import {TasksPage} from "./pages/TasksPage";
import {TaskPage} from "./pages/TaskPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Navigate to="/tasks" />} />
                    <Route path="/tasks/:project" element={<TasksPage />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/tasks/:project/:key" element={<TaskPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}