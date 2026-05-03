import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NoProjectPage} from "../page/noProject/NoProjectPage";
import {ProjectPage} from "../page/project/ProjectPage";
import {NavigationAppBar} from "../page/bar/NavigationAppBar";
import {TaskPage} from "../page/task/TaskPage";
import {AuthProjectRedirect} from "./AuthProjectRedirect";
import {AuthProjectGuard} from "./AuthProjectGuard";
import {NoAuthProjectGuard} from "./NoAuthProjectGuard";
import {RoleGuard} from "./RoleGuard";
import {useAuthService} from "../AuthProvider";
import {NoAccessPage} from "../page/noAccess/NoAccessPage";

export const Router = () => {
    const { ADMIN_ROLE } = useAuthService();

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

                    <Route element={<RoleGuard allowedRoles={[ADMIN_ROLE]}/>}>
                        <Route path="/noProject" element={<NoProjectPage/>}/>
                    </Route>

                    <Route>
                        <Route path="/noAccess" element={<NoAccessPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}