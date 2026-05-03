import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
import {CircularProgress} from "@mui/material";

interface RoleGuardProps {
}

export const NoAuthProjectGuard = ({}: RoleGuardProps) => {
    const location = useLocation();
    const {data, isLoading, isError, isSuccess} = useAuthParticipantProjectGet();

    if (isLoading) {
        return <CircularProgress/>
    }

    if (isError) {
        return <Navigate to="/noProject" replace state={{from: location}}/>
    }

    if (isSuccess) {
        if (data) {
            return <Navigate to={`/project/${data.key}/${data.name}`} replace state={{from: location}}/>
        } else {
            return <Outlet />
        }
    }
}