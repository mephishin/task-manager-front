import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Navigation} from "./components/navigation/Navigation";
import {NoPage} from "./pages/NoPage";
import {ProjectPage} from "./pages/ProjectPage";
import {TaskPage} from "./pages/TaskPage";
import {MyProjectPage} from "./pages/MyProjectPage";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route path="/project" >
                        <Route index element={<MyProjectPage />} />
                        <Route path=":project" element={<ProjectPage />} />
                    </Route>
                    <Route path="/task/:key" element={<TaskPage />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}