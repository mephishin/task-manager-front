import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
import {CircularProgress} from "@mui/material";

interface RoleGuardProps {
}

export const NoAuthProjectGuard = ({}: RoleGuardProps) => {
    const {data, isLoading, isError, isSuccess} = useAuthParticipantProjectGet();

    if (isLoading) {
        return <CircularProgress/>
    }

    if (isError) {
        return <Navigate to="/acceptInvite" replace />
    }

    if (isSuccess) {
        if (data) {
            return <Navigate to={`/project/${data.key}/${data.name}`} replace />
        } else {
            return <Outlet />
        }
    }
}