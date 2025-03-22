import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {Navigation} from "./Navigation";
import {NoPage} from "../../pages/NoPage";
import {Tasks} from "../../pages/Tasks";
import HomePage from "../../pages/HomePage";
import {Task} from "../../pages/Task";
import {Auth} from "../../pages/Auth";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<HomePage />} />
                    <Route path="/auth" element={<Auth />}/>
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/tasks/:key" element={<Task />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}