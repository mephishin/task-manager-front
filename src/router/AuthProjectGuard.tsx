import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
import {CircularProgress} from "@mui/material";

interface RoleGuardProps {
}

export const AuthProjectGuard = ({}: RoleGuardProps) => {
    const {data, isLoading, isError, isSuccess} = useAuthParticipantProjectGet();

    if (isLoading) {
        return <CircularProgress/>
    }

    if (isError) {
        return <Navigate to="/acceptInvite" replace />
    }

    if (isSuccess) {
        if (data) {
            return <Outlet />
        } else {
            return <Navigate to="/acceptInvite" replace />
        }
    }
}