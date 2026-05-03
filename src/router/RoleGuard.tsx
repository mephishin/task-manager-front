import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from "../AuthProvider";

interface RoleGuardProps {
    allowedRoles: string[]
}

export const RoleGuard = ({allowedRoles}: RoleGuardProps) => {
    const navigate = useNavigate();
    const { getRoles } = useAuth();

    if (allowedRoles.filter(item => getRoles()?.includes(item)).length === 0) {
        navigate("/noAccess")
    }

    return <Outlet/>
}