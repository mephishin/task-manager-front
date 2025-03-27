import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Navigation} from "./Navigation";
import {NoPage} from "../../pages/NoPage";
import {Tasks} from "../../pages/Tasks";
import {Task} from "../../pages/Task";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Navigate to="/tasks" />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/tasks/:key" element={<Task />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}