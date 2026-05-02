import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
import {CircularProgress} from "@mui/material";

interface RoleGuardProps {
    allowedRoles?: string[]
}

export const AuthProjectGuard = ({allowedRoles}: RoleGuardProps) => {
    const location = useLocation();
    const {data, isLoading, isError, isSuccess} = useAuthParticipantProjectGet();
    const navigate = useNavigate();

    if (isLoading) {
        return <CircularProgress/>
    }

    if (isError) {
        return <Navigate to="/noProject" replace state={{from: location}}/>
    }

    if (isSuccess) {
        if (data) {

            return <Outlet />
        } else {
            return <Navigate to="/noProject" replace state={{from: location}}/>
        }
    }
}