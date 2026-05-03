import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NoProjectPage} from "../page/noProject/NoProjectPage";
import {ProjectPage} from "../page/project/ProjectPage";
import {NavigationAppBar} from "../page/bar/NavigationAppBar";
import {TaskPage} from "../page/task/TaskPage";
import {IndexRedirect} from "./IndexRedirect";
import {AuthProjectGuard} from "./AuthProjectGuard";
import {NoAuthProjectGuard} from "./NoAuthProjectGuard";
import {RoleGuard} from "./RoleGuard";
import {useAuth} from "../AuthProvider";
import {NoAccessPage} from "../page/noAccess/NoAccessPage";
import {CreateProjectPage} from "../page/admin/CreateProjectPage";

export const Router = () => {
    const { ADMIN_ROLE } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavigationAppBar/>}>
                    <Route index element={<IndexRedirect/>}/>

                    <Route element={<AuthProjectGuard />}>
                        <Route path="/project/:projectId/:projectName" element={<ProjectPage/>}/>
                        <Route path="/task/:key" element={<TaskPage />}/>
                    </Route>

                    <Route element={<NoAuthProjectGuard />}>
                        <Route path="/noProject" element={<NoProjectPage />}/>
                    </Route>

                    <Route element={<RoleGuard allowedRoles={[ADMIN_ROLE]}/>}>
                        <Route path="/admin" element={<CreateProjectPage />}/>
                    </Route>

                    <Route>
                        <Route path="/noAccess" element={<NoAccessPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}