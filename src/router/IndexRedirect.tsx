// import {Navigate, useLocation} from 'react-router-dom';
// import {useAuthParticipantProjectGet} from "../hooks/query/project/useProject";
// import {CircularProgress} from "@mui/material";
// import {useAuth} from "../AuthProvider";
//
// export const IndexRedirect = () => {
//     const {data, isLoading, isError, isSuccess, isFetching} = useAuthParticipantProjectGet();
//     const {hasRole, ADMIN_ROLE} = useAuth();
//
//     if (isLoading) {
//         return <CircularProgress/>
//     }
//
//     if (isFetching) {
//         return <CircularProgress/>
//     }
//
//     if (isError) {
//         return <Navigate to="/acceptInvite" replace/>
//     }
//
//     if (isSuccess) {
//         if (data) {
//             return <Navigate to={`/project/${data.key}/${data.name}`} replace/>
//         } else {
//             if (hasRole(ADMIN_ROLE)) {
//                 return <Navigate to="/admin"/>
//             } else {
//                 return <Navigate to="/acceptInvite" replace/>
//             }
//         }
//
//     }
// }