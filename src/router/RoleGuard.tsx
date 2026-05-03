import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useAuthService} from "../AuthProvider";

interface RoleGuardProps {
    allowedRoles: string[]
}

export const RoleGuard = ({allowedRoles}: RoleGuardProps) => {
    const navigate = useNavigate();
    const { getRoles } = useAuthService();

    if (allowedRoles.filter(item => getRoles()?.includes(item)).length === 0) {
        navigate("/noAccess")
    }

    return <Outlet/>
}