import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "./Navigation";
import {NoPage} from "../../components/pages/NoPage";
import {Tasks} from "../../components/pages/Tasks";
import HomePage from "../../components/pages/HomePage";
import {Task} from "../../components/pages/Task";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<HomePage />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/tasks/:key" element={<Task />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}