import {Navigate, useLocation} from 'react-router-dom';
import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
import {CircularProgress} from "@mui/material";

export const AuthProjectRedirect = () => {
    const location = useLocation();
    const {data, isLoading, isError, isSuccess, isFetching} = useAuthParticipantProjectGet();

    if (isLoading) {
        return <CircularProgress/>
    }

    if (isFetching) {
        return <CircularProgress/>
    }

    if (isError) {
        return <Navigate to="/noProject" replace state={{from: location}}/>
    }

    if (isSuccess) {
        if (data) {
            return <Navigate to={`/project/${data.key}/${data.name}`} replace state={{from: location}}/>
        } else {
            return <Navigate to="/noProject" replace state={{from: location}}/>
        }

    }
}