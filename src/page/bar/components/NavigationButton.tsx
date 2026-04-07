import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../AuthService";
import { CreateProjectMenuItem } from "./createProject/CreateProjectMenuItem";
import { CreateTaskMenuItem } from "./createTask/CreateTaskMenuItem";

interface NavigationButtonProps {
}

export const NavigationButton = ({ }: NavigationButtonProps) => {
    const navigate = useNavigate();
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>();
    const handleCloseNavMenu = (path?: string) => {
        path && navigate(path)
        setAnchorElNav(null);
    };

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id='nav-menu'
                anchorEl={anchorElNav}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu(undefined)}
            >
                <MenuItem onClick={() => handleCloseNavMenu("/")}>
                    <Typography sx={{ textAlign: 'center' }}>Мой проект</Typography>
                </MenuItem>
                {AuthService.hasRole(AuthService.LEADER_ROlE) && <MenuItem onClick={() => handleCloseNavMenu("projectSearch")}>
                    <Typography sx={{ textAlign: 'center' }}>Найти проект</Typography>
                </MenuItem>}
                <MenuItem onClick={() => handleCloseNavMenu("taskSearch")}>
                    <Typography sx={{ textAlign: 'center' }}>Поиск задачи</Typography>
                </MenuItem>
                <CreateProjectMenuItem onClose={() => handleCloseNavMenu(undefined)} />
                <CreateTaskMenuItem onClose={() => handleCloseNavMenu(undefined)} />
            </Menu>
        </Box>
    )
}