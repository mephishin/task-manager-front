import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../AuthProvider";

interface RoleGuardProps {
    allowedRoles: string[]
}

export const RoleGuard = ({allowedRoles}: RoleGuardProps) => {
    const navigate = useNavigate();
    const { getRoles } = useAuth();

    if (!allowedRoles.some(allowedRole => getRoles()?.includes(allowedRole))) {
        navigate("/noAccess")
    }

    return <Outlet/>
}