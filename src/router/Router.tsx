import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NoProjectPage} from "../page/noProject/NoProjectPage";
import {ProjectPage} from "../page/project/ProjectPage";
import {NavigationAppBar} from "../page/bar/NavigationAppBar";
import {TaskPage} from "../page/task/TaskPage";
import {AuthProjectRedirect} from "./AuthProjectRedirect";
import {AuthProjectGuard} from "./AuthProjectGuard";
import {NoAuthProjectGuard} from "./NoAuthProjectGuard";

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigationAppBar/>}>
                    <Route index element={<AuthProjectRedirect/>}/>

                    <Route element={<AuthProjectGuard />}>
                        <Route path="/project/:projectId/:projectName" element={<ProjectPage/>}/>
                        <Route path="/task/:key" element={<TaskPage/>}/>
                    </Route>

                    <Route element={<NoAuthProjectGuard />}>
                        <Route path="/noProject" element={<NoProjectPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}